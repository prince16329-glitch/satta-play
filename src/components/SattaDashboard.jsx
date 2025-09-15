"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SattaResultTable from "./SattaResultTable";
import GameSection from "./GameSection";

const SattaDashboard = ({
  todayResults = [],
  yesterdayResults = [],
  lastResult,
  setting,
  monthlyResults = [],
  disawarData
}) => {
  // City names for monthly chart (using Hindi names from Sanity)
  const cityNames = [
    "सदर बाजार", "ग्वालियर", "दिल्ली मटका", "श्री गणेश", "आगरा",
    "फरीदाबाद", "अलवर", "गाज़ियाबाद", "द्वारका", "गली", "दिसावर"
  ];

  // Create monthly chart data
  const createMonthlyChart = () => {
    const daysInMonth = 31; // September has 30, but using 31 for now
    const rows = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const row = { day };
      cityNames.forEach((cityName, index) => {
        const cityKey = Object.keys({
          sadar_bazaar: "सदर बाजार",
          gwalior: "ग्वालियर",
          delhi_matka: "दिल्ली मटका",
          shri_ganesh: "श्री गणेश",
          agra: "आगरा",
          faridabad: "फरीदाबाद",
          alwar: "अलवर",
          ghaziabad: "गाज़ियाबाद",
          dwarka: "द्वारका",
          gali: "गली",
          disawar: "दिसावर"
        })[index];

        // Find result for this day and city
        const dayStr = `2025-09-${String(day).padStart(2, '0')}`;
        const result = monthlyResults.find(r =>
          r.date === dayStr &&
          Object.keys({
            sadar_bazaar: 0, gwalior: 1, delhi_matka: 2, shri_ganesh: 3, agra: 4,
            faridabad: 5, alwar: 6, ghaziabad: 7, dwarka: 8, gali: 9, disawar: 10
          }).indexOf(r.city) === index
        );

        row[`city${index}`] = result ? result.resultNumber : "--  ";
      });
      rows.push(row);
    }
    return rows;
  };

  const monthlyChartData = createMonthlyChart();

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="mx-auto bg-gradient">
        {/* Current Featured Game */}
        <div className="rounded-xl text-center">
          <div className="bg-gradientmidyellow3 px-2 pt-20 pb-8">
            <h2 className="text-4xl lg:text-5xl animate-bounce font-semibold  mt-24 text-theme-accent">
              B1 SATTA
            </h2>
            <p className="text-black pb-12 mt-10 px-4 text-2xl md:text-3xl font-semibold">
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
              <h2 className="sm:text-4xl lg:text-5xl text-xl font-bold text-theme-accent mb-2 md:mb-6">
                SEPTEMBER MONTHLY CHART
              </h2>
              <p className="text-black text-2xl sm:text-4xl lg:text-5xl font-bold">
                2025
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white">
            <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-yellow-300">
                      <th className="outline px-3 py-2 text-black text-sm sticky left-0 bg-yellow-300 z-10">
                        S.No
                      </th>
                      {cityNames.map((cityName, index) => (
                        <th
                          key={index}
                          className="border border-theme-primary px-3 py-2 text-black text-xs"
                        >
                          {cityName}
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
                        <td className="px-3 py-2 text-center text-black bg-yellow-300 outline text-sm font-medium sticky left-0 z-10">
                          {rowIndex + 1}
                        </td>
                        {cityNames.map((_, cityIndex) => (
                          <td
                            key={cityIndex}
                            className="border border-theme-primary px-3 py-2 hover:bg-yellow-100 transition-colors text-center text-black text-sm"
                          >
                            {row[`city${cityIndex}`]}
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
      </div>
    </div>
  );
};

export default SattaDashboard;