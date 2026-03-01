import "./globals.css";

export const metadata = {
  title: "B1 Satta Play – Live Satta Results, Charts & Updates",
  description:
    "B1 Satta Play provides fast and accurate live satta results, daily charts, and updates. Check B1 Satta Play charts 2024, 2025 and latest numbers here.",
  keywords: [
    "B1 Satta Play",
    "B1 satta play chart",
    "B1 satta result",
    "B1 satta play 2025",
    "B1 satta play 2024",
  ],
  metadataBase: new URL("https://www.b1sattaplay.in"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "JPqd3sjT4IdHPl6H6",
  },
  openGraph: {
    title: "B1 Satta Play – Live Results & Charts",
    description:
      "Check latest B1 Satta Play results, yearly charts and fast updates daily.",
    url: "https://www.b1sattaplay.in",
    siteName: "B1 Satta Play",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
