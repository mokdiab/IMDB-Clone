import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Header, NavBar } from "@/components";
import { ThemeModeProvider } from "@/components/ThemeContext";
export const metadata = {
  title: "IMDB Clone",
  description: "this is a movie site",
};

export default async function RootLayout({ children, params }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={direction} data-gr="false">
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeModeProvider>
            <Header />
            <NavBar />

            {children}
          </ThemeModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
