import type { IOnRequest } from '@pkgs/core-plugins';
import { useCookie, useNuxtApp } from '#build/imports';
import { tokenCookieName } from '~/constants/authentication';
import { defaultLocale, localeCookieName } from '~/constants/i18n';
import { toast } from 'vue-sonner';

const onRequest: IOnRequest = async (ctx) => {
  const { $crypto } = useNuxtApp();
  const encryptedToken = useCookie<string>(tokenCookieName);
  const lang = useCookie<string>(localeCookieName, {
    default: () => defaultLocale,
  });

  const token = encryptedToken.value
    ? await $crypto?.decrypt(encryptedToken.value + '')
    : undefined;
  if (token) ctx.headers['Authorization'] = `Bearer ${token}`;
  ctx.headers['Accept-Language'] = lang.value;

  // Add query param
  ctx.headers['Accept'] = 'application/json';
  ctx.headers['Access-Control-Allow-Origin'] = '*';
  ctx.headers['Access-Control-Allow-Credentials'] = 'true';
  ctx.headers.Credentials = 'true';

  if (process.env.NODE_ENV === 'development') {
    mwLog('[API MODULE ON REQUEST]', {
      url: ctx.endpoint,
      method: ctx.options?.method,
      headers: ctx.headers,
      body: ctx.options?.body,
    });
  }
  toast.error('API Error: ' + ctx.endpoint, {
    richColors: true,
    position: 'top-center',
  });
  return ctx;
};
export default onRequest;
