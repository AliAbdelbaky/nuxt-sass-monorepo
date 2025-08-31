export const rtlLanguages = ['ar-eg'];

export const getHtmlAttributes = (locale: string = 'en-us') => {
  const isRtl = rtlLanguages.includes(locale);
  const dir = isRtl ? 'rtl' : 'ltr';
  const lang = locale.toLowerCase();

  return {
    lang,
    dir,
  };
};
