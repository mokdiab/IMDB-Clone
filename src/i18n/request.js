import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers"; // Import cookies helper

export default getRequestConfig(async () => {
  // Try to read the user's preferred language from cookies
  const userLocale = cookies().get("locale")?.value || "en";

  return {
    locale: userLocale,
    messages: (await import(`../../messages/${userLocale}.json`)).default,
  };
});
