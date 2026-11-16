import en from "../../messages/en.json";
import fi from "../../messages/fi.json";

export type Locale = "en" | "fi";
export type Messages = Record<keyof typeof en, string>;

const catalogs = { en, fi } satisfies Record<Locale, Messages>;

// The locale belongs to each page/component, so rendering never shares mutable
// language state between requests or static pages.
export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}
