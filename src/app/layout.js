import { getSettings } from "@/services/result";
import "./globals.css";

export const metadata = {
  title: "Satta Play",
  description: "Satta Play",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
