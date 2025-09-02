// components/SattaResultTable.jsx
import React from "react";
import Image from "next/image";

const SattaResultTable = () => {
  // Data array for all satta games
  const sattaGames = [
    {
      id: 1,
      name: "hr satta",
      displayName: "HR SATTA",
      time: "12:15 PM",
      slug: "hr-satta",
      yesterdayResult: "--",
      todayResult: "02",
      isLoading: false,
    },
    {
      id: 2,
      name: "ujjala super",
      displayName: "UJJALA SUPER",
      time: "12:30 PM",
      slug: "ujjala-super",
      yesterdayResult: "--",
      todayResult: "14",
      isLoading: false,
    },
    {
      id: 3,
      name: "udaipur",
      displayName: "UDAIPUR",
      time: "12:35 PM",
      slug: "udaipur-",
      yesterdayResult: "--",
      todayResult: null,
      isLoading: true,
    },
    {
      id: 4,
      name: "karol bagh",
      displayName: "KAROL BAGH",
      time: "1:45 PM",
      slug: "karol-bagh",
      yesterdayResult: "--",
      todayResult: "42",
      isLoading: false,
    },
    {
      id: 5,
      name: "delhi darbar",
      displayName: "DELHI DARBAR",
      time: "2:10 PM",
      slug: "delhi-darbar",
      yesterdayResult: "--",
      todayResult: "75",
      isLoading: false,
    },
    {
      id: 6,
      name: "delhi bazar",
      displayName: "DELHI BAZAR",
      time: "3:15 PM",
      slug: "delhi-bazar",
      yesterdayResult: "--",
      todayResult: "01",
      isLoading: false,
    },
    {
      id: 7,
      name: "new ganga",
      displayName: "NEW GANGA",
      time: "3:40 PM",
      slug: "new-ganga",
      yesterdayResult: "--",
      todayResult: "50",
      isLoading: false,
    },
    {
      id: 8,
      name: "raj shree",
      displayName: "RAJ SHREE",
      time: "7:20 PM",
      slug: "raj-shree",
      yesterdayResult: "--",
      todayResult: "42",
      isLoading: false,
    },
    {
      id: 9,
      name: "firozabad",
      displayName: "FIROZABAD",
      time: "8:10 PM",
      slug: "firozabad",
      yesterdayResult: "--",
      todayResult: null,
      isLoading: true,
    },
    {
      id: 10,
      name: "mandi bazar",
      displayName: "MANDI BAZAR",
      time: "8:15 PM",
      slug: "mandi-bazar",
      yesterdayResult: "--",
      todayResult: null,
      isLoading: true,
    },
    {
      id: 11,
      name: "daman",
      displayName: "DAMAN",
      time: "9:50 PM",
      slug: "daman",
      yesterdayResult: "--",
      todayResult: null,
      isLoading: true,
    },
    {
      id: 12,
      name: "dehradun city",
      displayName: "DEHRADUN CITY",
      time: "10:40 PM",
      slug: "dehradun-city",
      yesterdayResult: "--",
      todayResult: null,
      isLoading: true,
    },
  ];

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
                <td className="py-2 text-center text-white border border-gray-800 bg-gradient flex">
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
  );
};

export default SattaResultTable;
