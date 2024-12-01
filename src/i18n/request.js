import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers"; // Import cookies helper

export default getRequestConfig(async () => {
  const getUserLocale = async () => {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value;
    return locale || "en";
  };

  const userLocale = await getUserLocale();

  return {
    locale: userLocale,
    messages: (await import(`../../messages/${userLocale}.json`)).default,
  };
});
