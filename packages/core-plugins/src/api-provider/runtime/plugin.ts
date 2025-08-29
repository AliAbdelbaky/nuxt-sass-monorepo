import { defineNuxtPlugin } from '#imports';
import config from '#build/api-provider-config.mjs';
import {
  onErrorHandler,
  onSuccessHandler,
  onRequestHandler,
} from '#build/api-provider-handlers.mjs';
import { validUrl, safeJson, getQueryString, toIError } from './api-utils';
import type { IError, IOnRequestContext } from './api-utils';

export default defineNuxtPlugin(() => {
  const BASE_URL: string = config.baseURL || '';
  const DEFAULT_TIMEOUT_MS: number = config.defaultTimeoutMs ?? 20_000;

  const normalizeHeaders = (headers?: HeadersInit): Record<string, string> => {
    if (!headers) return {};
    if (headers instanceof Headers) return Object.fromEntries(headers.entries());
    if (Array.isArray(headers)) return Object.fromEntries(headers);
    return { ...(headers as Record<string, string>) };
  };

  const dropContentTypeForFormData = (headers: Record<string, string>, body: unknown) => {
    if (body instanceof FormData) {
      for (const k of Object.keys(headers)) {
        if (k.toLowerCase() === 'content-type') delete headers[k];
      }
    }
    return headers;
  };

  const combineSignals = (a: AbortSignal, b?: AbortSignal): AbortSignal => {
    if (b && typeof (AbortSignal as unknown).any === 'function') {
      return (AbortSignal as unknown).any([a, b]);
    }
    return a;
  };

  const shouldOmitBody = (method?: string): boolean => {
    const m = (method || 'GET').toUpperCase();
    return m === 'GET' || m === 'HEAD';
  };

  async function apiProvider<T>(
    endpoint: string,
    options?:
      | (Omit<RequestInit, 'body'> & {
          timeoutMs?: number;
          body?: Record<string, unknown> | FormData;
        })
      | null,
    queries?: Record<string, unknown>
  ): Promise<T | undefined> {
    // Call user onRequest
    const ctx: IOnRequestContext = {
      endpoint,
      options: options ?? null,
      queries: { ...(queries ?? {}) },
      headers: {},
      baseURL: BASE_URL,
    };
    const maybe = await onRequestHandler(ctx);
    const r = maybe || ctx;

    // Build URL
    const base = validUrl(r.endpoint, BASE_URL);
    const qs = r.queries ? getQueryString(r.queries) : '';
    const url = qs ? `${base}?${qs}` : base;

    // Merge headers (user + onRequest only)
    let headers: Record<string, string> = {
      ...normalizeHeaders(r.options?.headers),
      ...r.headers,
    };

    // Body
    let body: BodyInit | undefined;
    if (r.options?.body instanceof FormData) {
      headers = dropContentTypeForFormData(headers, r.options.body);
      body = r.options.body;
    } else if (r.options?.body && typeof r.options.body === 'object') {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(r.options.body);
    }

    if (shouldOmitBody(r.options?.method)) body = undefined;

    // Timeout
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort('Request timeout'),
      r.options?.timeoutMs ?? DEFAULT_TIMEOUT_MS
    );
    const signal = combineSignals(controller.signal, r.options?.signal as AbortSignal | undefined);

    let response: Response;
    try {
      response = await fetch(url, {
        ...r.options,
        headers,
        body,
        signal,
      });
    } catch (e: unknown) {
      clearTimeout(timeout);
      const ierror: IError =
        e instanceof Error
          ? { message: e.message || 'Network error', details: { errors: {} } }
          : { message: 'Network error', details: { errors: {} } };
      await onErrorHandler(0, ierror);
      throw ierror;
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const payload = await safeJson<unknown>(response);
      const ierror = toIError(payload, response.statusText || 'Unknown error');
      await onErrorHandler(response.status, ierror);
      throw ierror;
    }

    const data = await safeJson<T>(response);
    try {
      await onSuccessHandler(r.endpoint, data);
    } catch {
      /* swallow */
    }

    return data;
  }

  const key = (config.provideName as string) || 'apiProvider';
  return { provide: { [key]: apiProvider } };
});
