// https://nuxt.com/docs/api/configuration/nuxt-config
import { apiProvider } from '@pkgs/core-plugins';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: ['@pkgs/ui', '@pkgs/core-plugins'],
  modules: ['@unocss/nuxt', apiProvider],
  css: ['@unocss/reset/tailwind.css'],
  apiProvider: {
    baseURL: 'www.example.com',
    localeCookieName: 'i18n_locale',
    tokenCookieName: 'auth_token',
    onErrorPath: '~/utils/api-on-error', // optional
    onSuccessPath: '~/utils/api-on-success', // optional
    provideName: '$api_provider', // you can use '$api' or '$apiProvider' etc.
    defaultTimeoutMs: 20000,
  },
});
