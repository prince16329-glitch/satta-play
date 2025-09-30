import React from "react";
import Image from "next/image";
import { GAMES, GAME_MAPPING } from "@/utils/gameConfig";

const SattaResultTable = ({ todayResults = [], yesterdayResults = [] }) => {
  // Create games array from centralized config
  const sattaGames = GAMES.map((game, index) => {
    const todayResult = todayResults.find(r => r.game === game.key)?.resultNumber;
    const yesterdayResult = yesterdayResults.find(r => r.game === game.key)?.resultNumber;

    return {
      id: index + 1,
      displayName: game.name,
      time: game.time,
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
            src="https://i.ibb.co/HffXjQCh/wait.gif"
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
                  GAME NAME
                </th>
                <th className="py-3 text-center border border-gray-800">
                  YESTERDAY
                </th>
                <th className="py-3 text-center border border-gray-800">
                  TODAY RESULT
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {sattaGames.map((game) => (
                <tr key={game.id}>
                  {/* Game Name Cell */}
                  <td className="py-2 px-2 text-center text-white border border-gray-800 bg-gradient flex">
                    <p className="text-sm font-bold text-black w-full md:text-lg mt-1 text-center">
                      {game.displayName}&nbsp;
                      <span className="max-[502px]:block">{game.time}</span>
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