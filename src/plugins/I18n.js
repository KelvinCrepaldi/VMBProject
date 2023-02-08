import { createI18n } from "vue-i18n";

const messages = {
  pt: {
    message: {
      tradePeriod:
        "No período de {date1} até {date2}, foram negociados {sumValue}.",
      limitMessage:
        "A lista é limitada em mostrar até 1000 negociações por vez.",
      from: "De:",
      to: "Até:",
      search: "Buscar...",
      filter: "Filtrar",
    },
  },
  en: {
    message: {
      tradePeriod:
        "In the period from {date1} to {date2}, {sumValue} were traded.",
      limitMessage: "The list is limited to showing up 1000 trades at a time.",
      from: "From:",
      to: "To:",
      search: "Search...",
      filter: "Filter",
    },
  },
};

export const i18n = createI18n({
  locale: "pt", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});
