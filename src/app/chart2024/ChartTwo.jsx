import Link from "next/link";

const ChartTwo = () => {
  const sattaLinks = [
    { id: 1, title: "DISAWER YEARLY CHART2024", href: "/Disawer2024" },
    { id: 2, title: "SHRI GANESH YEARLY 2024", href: "/Ganesh" },
    { id: 3, title: "GAZIYABAD YEARLY CHART2024", href: "/Gaziyabad" },
    { id: 4, title: "IPL YEARLY CHART2024", href: "/Ipl" },
    { id: 5, title: "FARIDABAD YEARLY CHART2024", href: "/Faridabad" },
    { id: 6, title: " VARANASI  YEARLY CHART2024", href: "/Varanasi" },
    { id: 7, title: "SIKANDERPUR YEARLY CHART2024", href: "/Sikanderpur" },
    { id: 8, title: "SURYA YEARLY CHART2024", href: "/Surya" },
    { id: 9, title: "GALI YEARLY CHART2024", href: "Gali" },
    { id: 10, title: "DELHI BAZAR YEARLY CHART2024", href: "/Delhi2024" },
  ];

  return (
    <div className=" mt-16 max-sm:mt-24 max-sm:pt-8 py-4">
      <h1 className=" bg-gradientredblack pb-3 text-[22px] text-white font-medium text-center px-3 pt-6">
        A1-satta provides all kind of satta king results everyday.
      </h1>
      <h1 className="capitalize bg-gradient2 text-3xl py-3 text-white font-semibold text-center">
        B1 Satta Play Chart 2024
      </h1>
      <div className="bg-gradientredblack2">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center max-sm:gap-3 max-md:gap-4 gap-5">
            {sattaLinks.map((link) => (
              <Link
                href={link.href}
                key={link.id}
                className="bg-gradient2 flex items-center justify-center text-nowrap px-6 py-2.5 leading-0 rounded-xs cursor-pointer hover:transform transition"
              >
                <p className="text-base underline hover:no-underline m-0 font-semibold uppercase text-black">
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
