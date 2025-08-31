import { getHtmlAttributes } from '~/constants/rtlLanguages';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('i18n:localeSwitched', ({ oldLocale, newLocale }) => {
    if (oldLocale === newLocale) return;
    const { lang, dir } = getHtmlAttributes(newLocale);
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
  });
});
