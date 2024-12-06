import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const userLocale = cookieStore.get("locale")?.value || "en";

  try {
    const messages = (await import(`../../messages/${userLocale}.json`))
      .default;

    return {
      locale: userLocale,
      messages,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale "${userLocale}":`, error);

    const fallbackMessages = (await import(`../../messages/en.json`)).default;

    return {
      locale: "en",
      messages: fallbackMessages,
    };
  }
});
