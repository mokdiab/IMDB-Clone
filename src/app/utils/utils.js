export const getLanguageWithLocale = (locale) => {
  const supportedLocales = {
    en: "en-US",
    ar: "ar-AR",
    fr: "fr-FR",
  };

  return supportedLocales[locale] || `${locale}-${locale.toUpperCase()}`;
};
