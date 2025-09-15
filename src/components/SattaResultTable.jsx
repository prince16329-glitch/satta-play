import React from "react";
import Image from "next/image";

const SattaResultTable = ({ todayResults = [], yesterdayResults = [] }) => {
  // City mapping with Sanity values
  const cityMapping = {
    sadar_bazaar: { displayName: "सदर बाजार", time: "12:15 PM" },
    gwalior: { displayName: "ग्वालियर", time: "12:30 PM" },
    delhi_matka: { displayName: "दिल्ली मटका", time: "12:35 PM" },
    shri_ganesh: { displayName: "श्री गणेश", time: "1:45 PM" },
    agra: { displayName: "आगरा", time: "2:10 PM" },
    faridabad: { displayName: "फरीदाबाद", time: "3:15 PM" },
    alwar: { displayName: "अलवर", time: "3:40 PM" },
    ghaziabad: { displayName: "गाज़ियाबाद", time: "7:20 PM" },
    dwarka: { displayName: "द्वारका", time: "8:10 PM" },
    gali: { displayName: "गली", time: "8:15 PM" },
    disawar: { displayName: "दिसावर", time: "9:50 PM" },
  };

  // Create games array from city mapping
  const sattaGames = Object.entries(cityMapping).map(([cityKey, cityInfo], index) => {
    const todayResult = todayResults.find(r => r.city === cityKey)?.resultNumber;
    const yesterdayResult = yesterdayResults.find(r => r.city === cityKey)?.resultNumber;

    return {
      id: index + 1,
      displayName: cityInfo.displayName,
      time: cityInfo.time,
      yesterdayResult: yesterdayResult || "--",
      todayResult: todayResult,
      isLoading: !todayResult,
    };
  });

  // Component to render result cell content
  const ResultCell = ({ result, isLoading }) => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <Image
            alt="wait icon"
            width={40}
            height={40}
            src="https://b1sattaplay.in/wp-content/uploads/2024/07/d.gif"
            priority={false}
          />
        </div>
      );
    }

    return (
      <div
        className="flex justify-center"
        style={{ marginBottom: 0, letterSpacing: "2px", fontSize: "22px" }}
      >
        <span className="text-2xl font-bold tracking-widest text-black">
          {result}
        </span>
      </div>
    );
  };

  return (
    <>
      <article className="p-0">
        <div className="relative p-0 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border-collapse border-gray-400">
            {/* Table Header */}
            <thead className="text-base text-white bg-gradientredblack">
              <tr>
                <th className="text-center border border-gray-800 py-3 w-[37%]">
                  सट्टा का नाम
                </th>
                <th className="py-3 text-center border border-gray-800">
                  कल आया था
                </th>
                <th className="py-3 text-center border border-gray-800">
                  आज का रिज़ल्ट
                </th>
              </tr>
            </thead>
            {/* Table Body - Using map for repetitive rows */}
            <tbody>
              {sattaGames.map((game) => (
                <tr key={game.id}>
                  {/* Game Name Cell */}
                  <td className="py-2 px-2 text-center text-white border border-gray-800 bg-gradient flex">
                    <p className="text-sm font-bold text-black w-full md:text-lg mt-1 text-center">
                      {game.displayName} {game.time}
                    </p>
                  </td>
                  {/* Yesterday Result Cell */}
                  <td className="text-center bg-white border border-gray-800 yesterday-number">
                    <div className="text-2xl font-bold tracking-widest text-black">
                      {game.yesterdayResult}
                    </div>
                  </td>
                  {/* Today Result Cell */}
                  <td className="text-center bg-white border border-gray-800 today-number">
                    <ResultCell 
                      result={game.todayResult}
                      isLoading={game.isLoading}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
};

export default SattaResultTable;