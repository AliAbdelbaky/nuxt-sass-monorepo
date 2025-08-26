// https://nuxt.com/docs/api/configuration/nuxt-config
console.log('Nuxt config loaded');
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: ['@pkgs/ui'],
  modules: ['@unocss/nuxt'],
  css: ['@unocss/reset/tailwind.css'],
});
