<script lang="ts" setup>
import 'vue-sonner/style.css';
import { ConfigProvider } from 'radix-vue';
import { Toaster } from 'vue-sonner';
import { useId, useCookie } from '#imports';
import { defaultLocale, localeCookieName } from '~/constants/i18n';
const useIdFunction = () => useId();

const rtlLanguages = ['ar-sa'];
const langCookie = useCookie(localeCookieName, {
  default: () => defaultLocale,
});

const getHtmlAttributes = (locale: string = 'en-us') => {
  const isRtl = rtlLanguages.includes(locale);
  const dir = isRtl ? 'rtl' : 'ltr';
  const lang = locale.toLowerCase();

  return {
    lang,
    dir,
  };
};
</script>
<template>
  <ConfigProvider :use-id="useIdFunction" :dir="getHtmlAttributes(langCookie).dir">
    <Toaster />
    <nuxtLayout>
      <main vaul-drawer-wrapper class="relative min-h-dvh">
        <NuxtPage />
      </main>
    </nuxtLayout>
  </ConfigProvider>
</template>
