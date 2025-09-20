"use client";
import GameSection from "./GameSection";
import SattaResultTable from "./SattaResultTable";
import { GAMES, GAME_KEYS, GAME_NAMES } from "@/utils/gameConfig";

const SattaDashboard = ({
  todayResults = [],
  yesterdayResults = [],
  lastResult,
  setting,
  monthlyResults = [],
  disawarData,
  currentSite = 'site1',
  siteName = 'B1 SATTA'
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();

  // Use site name from settings or props
  const displaySiteName = setting?.siteName || siteName;

  // Create monthly chart data using centralized config
  const createMonthlyChart = () => {
    const rows = [];
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');

    for (let day = 1; day <= daysInMonth; day++) {
      const row = { day };
      const dayStr = `${currentYear}-${monthStr}-${String(day).padStart(2, '0')}`;

      GAMES.forEach((game, index) => {
        // Find result for this specific date and game
        const result = monthlyResults.find(r =>
          r.date === dayStr && r.game === game.key
        );
        row[`game${index}`] = result ? result.resultNumber : "--";
      });

      rows.push(row);
    }
    return rows;
  };

  const monthlyChartData = createMonthlyChart();
console.log(disawarData,"disawarData")
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="mx-auto bg-gradient">
        {/* Current Featured Game */}
        <div className="rounded-xl text-center">
          <div className="bg-gradient px-2 pt-20 pb-8">
            <h2 className="text-4xl lg:text-5xl text-white animate-bounce font-semibold mt-24 text-theme-accent">
              {displaySiteName}
            </h2>
            <p className="text-white pb-12 mt-10 px-4 text-2xl md:text-3xl font-semibold">
              यही आती हे सबसे पहले खबर रूको और देखो
              <br />
              SUPER FAST RESULTS
            </p>
          </div>
        </div>

        <GameSection data={lastResult} setting={setting} disawarData={disawarData} />
        <SattaResultTable
          todayResults={todayResults}
          yesterdayResults={yesterdayResults}
        />

        {/* Chart Grid */}
        <div>
          <div className="bg-gradient p-6 text-center">
            <div className="">
              <h2 className="sm:text-4xl text-white lg:text-5xl text-2xl font-bold text-theme-accent mb-2 md:mb-6">
                {currentMonth} MONTH CHART
              </h2>
              <p className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold">
                {currentYear}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient2">
                  <th className="outline px-3 py-2 text-white text-sm sticky left-0 bg-gradient2 z-10">
                    S.No
                  </th>
                  {GAMES.map((game, index) => (
                    <th
                      key={index}
                      className="border border-theme-primary px-3 py-2 text-white text-xs"
                    >
                      {game.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyChartData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={` ${rowIndex % 2 !== 0 ? "bg-gray-200" : ""}`}
                  >
                    <td className="px-3 py-2 text-center text-white bg-gradient2 outline text-sm font-medium sticky left-0 z-10">
                      {rowIndex + 1}
                    </td>
                    {GAMES.map((_, gameIndex) => (
                      <td
                        key={gameIndex}
                        className="border border-theme-primary px-3 py-2 hover:bg-yellow-100 transition-colors text-center text-black text-sm"
                      >
                        {row[`game${gameIndex}`]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SattaDashboard;