"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SattaResultTable from "./SattaResultTable";
import { useEffect, useState } from "react";
import GameSection from "./GameSection";

const SattaDashboard = () => {
  const gameResults = [
    { name: "DISAWER", time: "05:00AM", result: "32" },
    { name: "IPL", time: "06:30AM", result: "89" },
    { name: "SIKNDRPUR", time: "07:15AM", result: "52" },
    { name: "DELHI BAZAR", time: "08:00AM", result: "00" },
    { name: "SHRI GANESH", time: "08:45AM", result: "18" },
    { name: "FARIDABAD", time: "09:30AM", result: "67" },
    { name: "SURYA", time: "10:15AM", result: "56" },
    { name: "GAZIABAD", time: "09:30PM", result: "01" },
    { name: "VARANASI", time: "10:05PM", result: "93" },
    { name: "GALI", time: "11:00PM", result: "71" },
  ];

  const chartNumbers = [
    ["64", "70", "71", "64"],
    ["32", "89", "52", "00"],
    ["18", "67", "56", "01"],
    ["93", "71", "64", "90"],
  ];

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

        <GameSection />
        <SattaResultTable />
        {/* Chart Grid */}
        <div>
          <div className="bg-gradient p-6 text-center">
            <div className="">
              <h2 className="sm:text-4xl lg:text-5xl text-2xl font-bold text-theme-accent mb-2 md:mb-6">
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
                      <th className="border border-theme-primary px-3 py-2 text-black text-sm sticky left-0 bg-yellow-300 z-10">
                        S.No
                      </th>
                      {gameResults.slice(0, 10).map((game, index) => (
                        <th
                          key={index}
                          className="border border-theme-primary px-3 py-2 text-black text-xs"
                        >
                          {game.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 30 }, (_, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`hover:bg-yellow-100 transition-colors ${
                          rowIndex % 2 !== 0 ? "bg-gray-200" : ""
                        }`}
                      >
                        <td className="border border-theme-primary px-3 py-2 text-center text-black bg-yellow-300 text-sm font-medium sticky left-0 z-10">
                          {rowIndex + 1}
                        </td>
                        {gameResults.slice(0, 10).map((_, gameIndex) => (
                          <td
                            key={gameIndex}
                            className="border border-theme-primary px-3 py-2 text-center text-black text-sm"
                          >
                            XX
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
      <Link
        className="fixed bottom-10 right-10"
        target="_blank"
        href="https://wa.me/+919817050720"
      >
        <Image
          className="animate-pulse"
          width={70}
          height={70}
          src="https://i.ibb.co/x8fsyXVj/Whats-App-svg.webp"
          alt="whatsapp"
        />
      </Link>
      <p className="max-w-[1140px] text-center mx-auto mt-4 pb-4">
        !! DISCLAIMER :-{" "}
        <span className="text-blue-500">http:/sattaplay.in</span> is a
        non-commercial website. Viewing This Website Is Your Own Risk, All The
        Information Shown On Website Is Sponsored And We Warn You That Matka
        Gambling/Satta May Be Banned Or Illegal In Your Country ... , We Are Not
        Responsible For Any Issues Or Scam ... , We Respect All Country
        Rules/Laws ... If You Not Agree With Our Site Disclaimer ... Please Quit
        Our Site Right Now. Thank You.
      </p>
    </div>
  );
};

export default SattaDashboard;
