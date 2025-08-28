import { defineNuxtPlugin, useCookie } from '#imports';
import config from '#build/api-provider-config.mjs';
import { onErrorHandler, onSuccessHandler } from '#build/api-provider-handlers.mjs';
import { validUrl, safeJson, getQueryString, toIError } from './api-utils';
import type { IError, Lang } from './api-utils';

type CryptoLike = { decrypt: (input: string) => Promise<string> | string } | undefined;

export default defineNuxtPlugin((nuxtApp) => {
  const BASE_URL: string = config.baseURL || '';
  const LANG_COOKIE = useCookie<Lang | string>(config.localeCookieName);
  const AUTH_COOKIE = useCookie<string>(config.tokenCookieName);
  const DEFAULT_TIMEOUT_MS: number = config.defaultTimeoutMs ?? 20_000;

  const DEFAULT_HEADERS: Readonly<Record<string, string>> = {
    Accept: 'application/json',
    'Accept-Language': (LANG_COOKIE.value as string) || 'en',
  };

  /** Normalize any HeadersInit into a plain mutable record */
  const normalizeHeaders = (headers?: HeadersInit): Record<string, string> => {
    if (!headers) return {};
    if (headers instanceof Headers) return Object.fromEntries(headers.entries());
    if (Array.isArray(headers)) return Object.fromEntries(headers);
    return { ...(headers as Record<string, string>) };
  };

  /** If body is FormData, remove any existing content-type so browser sets boundary automatically */
  const dropContentTypeForFormData = (
    headers: Record<string, string>,
    body: unknown
  ): Record<string, string> => {
    if (body instanceof FormData) {
      for (const k of Object.keys(headers)) {
        if (k.toLowerCase() === 'content-type') delete headers[k];
      }
    }
    return headers;
  };

  /** Combine our timeout signal with any user-provided signal (when supported) */
  const combineSignals = (a: AbortSignal, b?: AbortSignal): AbortSignal => {
    if (b && typeof AbortSignal?.any === 'function') return AbortSignal.any([a, b]);
    return a;
  };

  /** Ensure GET/HEAD have no body */
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
    // Build URL
    const base = validUrl(endpoint, BASE_URL);
    const qs = queries ? getQueryString(queries) : '';
    const url = qs ? `${base}?${qs}` : base;

    // Token decrypt (optional)
    const cryptoSvc: CryptoLike = (nuxtApp as unknown as { $crypto?: CryptoLike }).$crypto;
    const tokenCipher = AUTH_COOKIE.value;
    let token: string | undefined;
    if (tokenCipher) {
      try {
        const maybe = cryptoSvc?.decrypt(tokenCipher);
        token = typeof maybe === 'string' ? maybe : await maybe;
      } catch {
        token = tokenCipher; // fallback to raw token if decrypt fails
      }
    }

    // Headers
    let headers: Record<string, string> = {
      ...DEFAULT_HEADERS,
      ...normalizeHeaders(options?.headers),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Body handling
    let body: BodyInit | undefined;
    if (options?.body instanceof FormData) {
      headers = dropContentTypeForFormData(headers, options.body);
      body = options.body;
    } else if (options?.body && typeof options.body === 'object') {
      // Auto JSON for plain objects
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.body);
    }

    // Do not send body for GET/HEAD
    if (shouldOmitBody(options?.method)) {
      body = undefined;
    }

    // Timeout
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort('Request timeout'),
      options?.timeoutMs ?? DEFAULT_TIMEOUT_MS
    );
    const signal = combineSignals(controller.signal, options?.signal as AbortSignal | undefined);

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        headers, // keep ours last for normalized shape
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
      await onSuccessHandler(endpoint, data);
    } catch {
      // never let a user hook break the caller
    }

    return data;
  }

  const key = (config.provideName as string) || 'apiProvider';
  return { provide: { [key]: apiProvider } };
});
