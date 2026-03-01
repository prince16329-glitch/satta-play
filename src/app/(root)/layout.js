import Navbar from "@/components/common/Navbar";
import TopProgressBar from "@/components/TopProgressBar";
import { getSettings } from "@/services/result";
import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";

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
  const setting = await getSettings()
  return (
    <>
      <TopProgressBar />
      <Navbar />
      {children}
      <Link
        className="fixed bottom-6 right-6"
        target="_blank"
        href={`https://wa.me/+91${setting?.site1_whatsappNumber}`}
      >
        <Image
          className="max-sm:!size-14"
          width={70}
          height={70}
          src="https://i.ibb.co/x8fsyXVj/Whats-App-svg.webp"
          alt="whatsapp"
        />
      </Link>
      <p className="max-w-[1140px] text-center mx-auto mt-4 px-3 pb-4 sm:text-base text-xs font-medium">
        !! DISCLAIMER :-{" "}
        <Link href="https://b1sattaplay.in/" target="_blank" className="text-[#f2295be9] font-bold hover:text-[#f2295b]">http:/B1sattaplay.in</Link> is a
        non-commercial website. Viewing This Website Is Your Own Risk, All The
        Information Shown On Website Is Sponsored And We Warn You That Matka
        Gambling/Satta May Be Banned Or Illegal In Your Country ... , We Are
        Not Responsible For Any Issues Or Scam ... , We Respect All Country
        Rules/Laws ... If You Not Agree With Our Site Disclaimer ... Please
        Quit Our Site Right Now. Thank You.
      </p>
    </>
  );
}
