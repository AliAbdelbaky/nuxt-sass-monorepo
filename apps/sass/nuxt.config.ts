// https://nuxt.com/docs/api/configuration/nuxt-config
import { ApiProvider, CryptoProvider, AutoAttachMiddleware } from '@pkgs/core-plugins';
import { localeCookieName, defaultLocale } from './app/constants/i18n';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: ['@pkgs/ui', '@pkgs/core-plugins'],
  modules: ['@unocss/nuxt', '@nuxtjs/i18n', ApiProvider, CryptoProvider, AutoAttachMiddleware],
  css: ['@unocss/reset/tailwind.css'],
  apiProvider: {
    baseURL: process.env.API_BASE_URL,
    onErrorPath: '~/utils/api-on-error', // optional
    onSuccessPath: '~/utils/api-on-success', // optional
    onRequestPath: '~/utils/api-on-request.ts', // optional
    provideName: '$api_provider', // you can use '$api' or '$apiProvider' etc.
    defaultTimeoutMs: 20000,
  },
  crypto: {
    passphrase: process.env.ENCRYPTION_PASSPHRASE,
    provideName: '$crypto', // or 'crypto'
    iterations: 150_000, // optional override
  },
  autoAttachMiddleware: {
    rules: [
      { layouts: ['protected'], middlewares: ['auth'] },
      { layouts: ['auth'], middlewares: ['auth'] },
      // { layouts: ['empty-protected'], middlewares: ['empty-protected'] },
    ],
  },
  i18n: {
    defaultLocale: defaultLocale,
    strategy: 'prefix',
    locales: [
      { code: 'en-us', name: 'English', file: 'en-us.json' },
      { code: 'ar-eg', name: 'Arabic', file: 'ar-eg.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: localeCookieName,
      fallbackLocale: defaultLocale,
      redirectOn: 'root',
    },
  },
});
