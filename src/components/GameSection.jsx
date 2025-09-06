"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DateTime from "./DateTime";

const GameSection = () => {
  const schedule = [
    {
      name: "सदर बाजार",
      time: "13:20",
      number: "45",
      prevNumber: "72",
      todayNumber: "45",
    },
    {
      name: "ग्वालियर",
      time: "14:20",
      number: "62",
      prevNumber: "33",
      todayNumber: "62",
    },
    {
      name: "दिल्ली मटका",
      time: "15:20",
      number: "27",
      prevNumber: "49",
      todayNumber: "27",
    },
    {
      name: "श्री गणेश",
      time: "16:20",
      number: "84",
      prevNumber: "65",
      todayNumber: "84",
    },
    {
      name: "आगरा",
      time: "17:20",
      number: "11",
      prevNumber: "20",
      todayNumber: "11",
    },
    {
      name: "फरीदाबाद",
      time: "17:50",
      number: "32",
      prevNumber: "59",
      todayNumber: "32",
    },
    {
      name: "अलवर",
      time: "19:20",
      number: "90",
      prevNumber: "73",
      todayNumber: "90",
    },
    {
      name: "गाज़ियाबाद",
      time: "20:50",
      number: "75",
      prevNumber: "18",
      todayNumber: "75",
    },
    {
      name: "द्वारका",
      time: "22:15",
      number: "41",
      prevNumber: "66",
      todayNumber: "41",
    },
    {
      name: "गली",
      time: "23:20",
      number: "11",
      prevNumber: "50",
      todayNumber: "11",
    },
    {
      name: "दिसावर",
      time: "01:30",
      number: "62",
      prevNumber: "28",
      todayNumber: "62",
    },
  ];

  const [prevGame, setPrevGame] = useState(null);
  const [nextGame, setNextGame] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(0); // नीचे वाली div का index

  // Top dynamic section ke liye
  useEffect(() => {
    const checkGame = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let activeIndex = -1;

      for (let i = 0; i < schedule.length; i++) {
        const [h, m] = schedule[i].time.split(":").map(Number);
        let gameMinutes = h * 60 + m;

        // रात 1:30 (next day) case
        if (h < 5) {
          gameMinutes += 24 * 60;
        }

        if (currentMinutes < gameMinutes) {
          activeIndex = i;
          break;
        }
      }

      if (activeIndex === -1) {
        activeIndex = schedule.length - 1;
      }

      const prev =
        schedule[(activeIndex - 1 + schedule.length) % schedule.length];
      const next = schedule[activeIndex];

      setPrevGame(prev);
      setNextGame(next);
    };

    checkGame();
    const interval = setInterval(checkGame, 60000); // हर 1 मिनट बाद check
    return () => clearInterval(interval);
  }, []);

  // नीचे वाली div ka data auto change hoga
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % schedule.length);
    }, 10000); // हर 10 सेकंड में change
    return () => clearInterval(interval);
  }, [schedule.length]);

  const highlightGame = schedule[highlightIndex];

  return (
    <>
      {/* === TOP DYNAMIC SECTION === */}
      <div className="bg-white pt-2">
        <div className="text-center mt-2">
          <DateTime />
        </div>
        <hr className="border-dashed w-full mx-auto my-3" />

        <div className="flex text-2xl sm:text-3xl md:text-4xl mx-auto text-center w-full font-semibold flex-col gap-5 item-center justify-center">
          {/* Previous game */}
          {prevGame && (
            <>
              <p>{prevGame.name}</p>
              <p className="text-xl sm:text-2xl md:text-3xl">
                {prevGame.number}
              </p>
            </>
          )}

          {/* Next game (waiting) */}
          {nextGame && (
            <>
              <p>{nextGame.name}</p>
              <Image
                className="mx-auto -mt-2"
                alt="wait icon"
                width={40}
                height={40}
                src="https://b1sattaplay.in/wp-content/uploads/2024/07/d.gif"
                priority={false}
              />
            </>
          )}
        </div>

        {/* Auto Changing Bet */}
        {highlightGame && (
          <div className="bg-gradient2 mt-4 p-3 text-center w-full mx-auto">
            {/* Place Name */}
            <p className="text-2xl font-bold mb-2">{highlightGame.name}</p>

            <div className="flex items-center justify-between max-w-[350px] mx-auto">
              {/* Previous Day Number */}
              <span className="flex-1 text-lg font-semibold">
                {highlightGame.prevNumber}
              </span>

              {/* Arrow */}
              <span className="px-3 py-1 bg-green-500 text-white rounded-full mx-2">
                ➡
              </span>

              {/* Today Number (WAITING case handle) */}
              <span className="flex-1 text-lg font-semibold text-blue-600">
                {nextGame && nextGame.name === highlightGame.name
                  ? "WAITING"
                  : highlightGame.todayNumber}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* === BOTTOM STATIC SECTION === */}
      <section className="flex flex-col md:flex-row md:space-x-1 bg-white">
        <div className="text-center w-full">
          <div className="bg-gradient py-2.5 m-0 font-semibold">
            <p className="text-4xl max-sm:text-lg mt-2 mb-0 md:my-5 max-md:text-2xl">
              --सीधे सट्टा कंपनी का No 1 खाईवाल--
            </p>
          </div>
          <div className="flex-1 px-2 pt-4 pb-4 text-base font-semibold leading-6 text-gray-900 min-h-1 bg-gradient">
            <div className="text-start mx-auto max-w-[300px]">
              {schedule.map((game, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center font-semibold py-0.5"
                >
                  {/* Left side: clock + name */}
                  <span className="flex items-center gap-1 text-nowrap">
                    ⏰ {game.name}
                  </span>
                  <span>---------</span>
                  {/* Right side: time */}
                  <span className="text-nowrap">{game.time}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xl">💸 Payment Option 💸</p>
            <p>
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
              <Link target="_blank" href="https://wa.me/+917206591251">
                Game play करने के लिये नीचे लिंक पर क्लिक करे
              </Link>
            </p>
            <div className="mx-auto max-w-[300px] mt-4">
              <Link target="_blank" href="https://wa.me/+919817050720">
                <Image
                  className="max-sm:w-[200px] mx-auto max-sm:h-16"
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
    </>
  );
};

export default GameSection;
