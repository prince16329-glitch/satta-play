import Navbar from "@/components/common/Navbar";
import TopProgressBar from "@/components/TopProgressBar";
import { getSettings } from "@/services/result";
import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";

export const metadata = {
  title: "Satta Play",
  description: "Satta Play - Satta Matka Results, Charts, and More",
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
        href={`https://wa.me/+${setting?.site1_whatsappNumber}`}
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
