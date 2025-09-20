import "./globals.css";

export const metadata = {
  title: "Satta Play",
  description: "Satta Play",
  icons: {
    icon: '/favicon.ico',
  },
  viewport: { width: 'device-width', initialScale: 1 }
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
