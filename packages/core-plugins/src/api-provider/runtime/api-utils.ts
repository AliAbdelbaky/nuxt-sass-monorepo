// modules/api-provider/runtime/api-utils.ts

export interface IError {
  message: string;
  details: {
    errors: Record<string, string>;
    [key: string]: string | Record<string, string>;
  };
}

export type UnknownRecord = Record<string, unknown>;
export type Lang = 'ar' | 'en';

/**
 * Signature for custom error handlers.
 * The handler should either return void or a Promise<void>.
 */
export interface IOnErrorHandler {
  (status: number, err: IError): void | Promise<void>;
}

/**
 * Signature for custom success handlers.
 * The handler should either return void or a Promise<void>.
 */
export interface IOnSuccessHandler {
  <T = unknown>(endpoint: string, data: T | undefined): void | Promise<void>;
}

export const validUrl = (endpoint: string, BASE_URL: string): string => {
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  if (endpoint.startsWith('/') && BASE_URL.endsWith('/')) return BASE_URL + endpoint.slice(1);
  return BASE_URL + endpoint;
};

export const safeJson = async <T>(res: Response): Promise<T | undefined> => {
  try {
    if (res.status === 204 || res.status === 205) return undefined;
    return (await res.json()) as T;
  } catch {
    return undefined;
  }
};

export function getQueryString(params?: Record<string, unknown>): string {
  if (!params) return '';
  const q = new URLSearchParams();
  for (const k in params) {
    const v = params[k];
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && v.trim() === '') continue;
    q.append(k, String(v));
  }
  return q.toString();
}

export function toIError(input: unknown, fallbackMessage: string): IError {
  const base: IError = { message: fallbackMessage, details: { errors: {} } };
  if (!input || typeof input !== 'object') return base;

  const obj = input as UnknownRecord;
  const details: IError['details'] = { errors: {} };

  const message =
    (typeof obj.message === 'string' && obj.message) ||
    (typeof obj.error === 'string' && obj.error) ||
    (Array.isArray(obj.errors) && obj.errors.map(String).join(', ')) ||
    fallbackMessage;

  const pushErrors = (maybe: unknown) => {
    if (!maybe || typeof maybe !== 'object' || Array.isArray(maybe)) return;
    for (const [k, v] of Object.entries(maybe as UnknownRecord)) {
      if (typeof v === 'string') details.errors[k] = v;
      else if (Array.isArray(v)) details.errors[k] = v.map(String).join(', ');
      else if (v != null) details.errors[k] = String(v);
    }
  };

  if (obj.errors) pushErrors(obj.errors);
  if (obj.detail) pushErrors(obj.detail);
  if (obj.details) pushErrors(obj.details);
  if (obj.data && (obj.data as UnknownRecord).errors)
    pushErrors((obj.data as UnknownRecord).errors);

  for (const [k, v] of Object.entries(obj)) {
    if (k === 'errors') continue;
    if (typeof v === 'string') details[k] = v;
    else if (Array.isArray(v)) details[k] = v.map(String).join(', ');
  }

  if (!details.errors) details.errors = {};

  return { message, details };
}
