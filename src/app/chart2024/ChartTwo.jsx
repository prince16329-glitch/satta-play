import Link from "next/link";

const ChartTwo = () => {
  const sattaLinks = [
    { id: 1, title: "SADAR BAZAAR YEARLY CHART 2024" },
    { id: 2, title: "GWALIOR YEARLY CHART 2024" },
    { id: 3, title: "DELHI MATKA YEARLY CHART 2024" },
    { id: 4, title: "SHRI GANESH YEARLY CHART 2024" },
    { id: 5, title: "AGRA YEARLY CHART 2024" },
    { id: 6, title: "FARIDABAD YEARLY CHART 2024" },
    { id: 7, title: "ALWAR YEARLY CHART 2024" },
    { id: 8, title: "GHAZIABAD YEARLY CHART 2024" },
    { id: 9, title: "DWARKA YEARLY CHART 2024" },
    { id: 10, title: "GALI YEARLY CHART 2024" },
    { id: 11, title: "DISAWAR YEARLY CHART 2024" },
  ];

  return (
    <div className="mt-14 py-4 h-full">
      <h1 className="bg-gradientredblack pb-3 text-[22px] text-white font-medium text-center px-3 pt-6">
        A1-satta provides all kind of satta king results everyday.
      </h1>
      <h1 className="capitalize bg-gradient2 text-3xl py-3 text-white font-semibold text-center">
        B1 Satta Play Chart 2024
      </h1>
      <div className="bg-gradientredblack2 h-full py-10">
        <div className="container mx-auto max-sm:px-3 px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center max-md:gap-4 max-sm:gap-3 gap-5">
            {sattaLinks.map((link) => (
              <Link
                key={link.id}
                href={link.title.toLowerCase().replace(/\s+/g, "-")}
                className="bg-gradient2 flex items-center justify-center hover:underline underline-offset-2 duration-300 text-nowrap px-6 py-2.5 rounded-xs cursor-pointer hover:transform transition-all"
              >
                <p className="text-base max-sm:text-sm m-0 font-semibold uppercase text-black">
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
