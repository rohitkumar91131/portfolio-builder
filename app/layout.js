import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Rohit Kumar | Portfolio",
  description: "Developer Portfolio",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          {children}
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}