// https://nuxt.com/docs/api/configuration/nuxt-config
import { ApiProvider, CryptoProvider } from '@pkgs/core-plugins';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: ['@pkgs/ui', '@pkgs/core-plugins'],
  modules: ['@unocss/nuxt', ApiProvider, CryptoProvider],
  css: ['@unocss/reset/tailwind.css'],
  apiProvider: {
    baseURL: 'https://system.trypair.ai/',
    onErrorPath: '~/utils/api-on-error', // optional
    onSuccessPath: '~/utils/api-on-success', // optional
    onRequestPath: '~/utils/api-on-request.ts', // optional
    provideName: '$api_provider', // you can use '$api' or '$apiProvider' etc.
    defaultTimeoutMs: 20000,
  },
  crypto: {
    passphrase: process.env.NUXT_PUBLIC_ENCRYPTION_PASSPHRASE || 'dev-secret',
    provideName: '$crypto', // or 'crypto'
    iterations: 150_000, // optional override
  },
});
