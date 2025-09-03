"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SattaResultTable from "./SattaResultTable";
import { useEffect, useState } from "react";

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
          <div className="bg-gradientmidyellow3 px-2 pt-20 pb-8 sm:pb-16 lg:py-24">
            <h2 className="sm:text-4xl lg:text-5xl text-3xl animate-bounce font-semibold  mt-24 text-theme-accent">
              B1 SATTA
            </h2>
          </div>
          <p className="text-black sm:pb-12 pb-10 md:pb-16 lg:pb-20 px-4 pt-2 bg-gradientmidyellow text-2xl md:text-3xl font-semibold">
            यही आती हे सबसे पहले खबर रूको और देखो
            <br />
            SUPER FAST RESULTS
          </p>
        </div>
        <div className="bg-white py-2">
          <hr className="border-dashed max-w-5xl mx-auto my-3" />
          <div className="mx-auto font-semibold gap-4 grid py-5 md:grid-cols-3 max-w-6xl items-center">
            <div className="flex lg:text-5xl text-4xl item-center justify-center">
              LIVE RESULT
            </div>
            <div className="flex text-2xl item-center justify-center">
              SURYA
            </div>
            <div className="flex text-2xl item-center justify-center">71</div>
          </div>
        </div>

        <section className="flex flex-col md:flex-row md:space-x-1 bg-white">
          <div className="text-center w-full">
            <div className="bg-gradient py-2.5 m-0 font-semibold">
              <p className="text-4xl max-sm:text-2xl">
                --सीधे सट्टा कंपनी का No 1 खाईवाल--
              </p>
            </div>
            <div className="flex-1 px-2 pt-4 pb-4 text-base font-semibold leading-6 text-gray-900 min-h-1 bg-gradient">
              <p>♕♕&nbsp;DEV BHAI ONLINE KHAIWAL ♕♕</p>
              <p>⏰ सदर बाजार ------------ &nbsp;1:20 PM</p>
              <p>⏰ ग्वालियर --------------- 2:20 PM</p>
              <p>⏰ दिल्ली मटका ----------- 3:20 PM</p>
              <p>⏰ श्री गणेश -------------- 4:20 PM</p>
              <p>⏰ आगरा -----------------5:20 PM</p>
              <p>⏰ फरीदाबाद ------------- &nbsp;5:50 PM</p>
              <p>⏰ अलवर -----------------7:20 PM</p>
              <p>⏰ गाज़ियाबाद ------------- 8:50 PM</p>
              <p>⏰ द्वारका -----------------10:15 PM</p>
              <p>⏰ गली ------------------ 11:20 PM</p>
              <p>⏰ दिसावर --------------- &nbsp;1:30 AM</p>
              <p>
                💸 Payment Option 💸
                <br />
                <br />
                PAYTM//BANK TRANSFER//PHONE PAY//GOOGLE PAY =&lt; ⏺️9996252688⏺️
                <br />
                ==========================
                <br />
                ==========================
              </p>
              <p>
                🤑Rate list💸
                <br />
                <br />
                जोड़ी रेट 10-------960
                <br />
                हरूफ रेट 100-----960
              </p>
              <p>♕♕ &nbsp;SAMEER BHAI KHAIWAL &nbsp;♕♕</p>
              <p>
                <Link href="https://wa.me/+917206591251">
                  Game play करने के लिये नीचे लिंक पर क्लिक करे
                </Link>
              </p>
              <p>&nbsp;</p>
              <div className="mx-auto max-w-[300px]">
                <Link href="https://wa.me/+919817050720">
                  <Image
                    width={300}
                    height={100}
                    src="https://i.ibb.co/4RJCLbSB/whatsapp.png"
                    alt="whatsapp"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SattaResultTable />
        <div className="items-center justify-center flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            overflow="visible"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="1"
            strokeLinecap="square"
            strokeMiterlimit="10"
          >
            <path d="M0,6c6,0,0.9,11.1,6.9,11.1S18,6,24,6" />
          </svg>
        </div>
        {/* Chart Grid */}
        <div>
          <div className="bg-gradient p-6 text-center">
            <div className="">
              <h2 className="sm:text-4xl lg:text-5xl text-2xl font-bold text-theme-accent mb-2 md:mb-6">
                SEPTEMBER MONTHLY CHART
              </h2>
              <p className="text-black text-2xl md:text-3xl lg:text-4xl font-bold">
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
    </div>
  );
};

export default SattaDashboard;
