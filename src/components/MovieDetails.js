import { getLocale } from "next-intl/server";
import { getLanguageWithLocale } from "@/utils";
import { ClientDetails } from "@/components";

export default async function Details({ movie }) {
  const locale = await getLocale();
  const language = getLanguageWithLocale(locale);

  return <ClientDetails movie={movie} locale={locale} />;
}
