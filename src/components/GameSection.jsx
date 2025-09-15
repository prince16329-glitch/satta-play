"use client";
import Image from "next/image";
import Link from "next/link";
import DateTime from "./DateTime";

const GameSection = ({ data, setting, disawarData }) => {
  const schedule = [
    { name: "IPL", time: "12:55 PM", number: "45" },
    { name: "SIKANDERPUR", time: "01:55 PM", number: "62" },
    { name: "DELHI BAZAR", time: "03:00 PM", number: "27" },
    { name: "SHRI GANESH", time: "04:30 PM", number: "84" },
    { name: "FARIDABAD ", time: "05:45 PM", number: "11" },
    { name: "SURYA ", time: "07:25 PM", number: "32" },
    { name: "GAZIYABAD ", time: "08:55 PM", number: "90" },
    { name: "VARANASI", time: "09:55 PM", number: "75" },
    { name: "GALI ", time: "11:20 PM", number: "41" },
    { name: "DISAWAR ", time: "04:30 AM", number: "11" },
  ];

  return (
    <>
      {/* === TOP DYNAMIC SECTION === */}
      <div className="bg-white pt-2 pb-3">
        <div className="text-center mt-2">
          <DateTime />
        </div>
        <hr className="border-dashed w-full mx-auto my-3" />

        <div className="flex text-2xl uppercase sm:text-3xl md:text-4xl mx-auto text-center w-full font-semibold flex-col gap-5 item-center justify-center">
          {/* ✅ Previous game */}
          {data && (
            <>
              <p>{data.game}</p>
              <p className="text-xl sm:text-2xl md:text-3xl">
                {data.resultNumber}
              </p>

              {/* ✅ Next game (WAITING) */}

              <p>{data.waitingGame}</p>
              <Image
                className="mx-auto -mt-2"
                alt="wait icon"
                width={40}
                height={40}
                src="https://b1sattaplay.in/wp-content/uploads/2024/07/d.gif"
              />
            </>
          )}

        </div>
      </div>
      <div className="bg-gradient2 p-3 text-center w-full mx-auto">
        <p className="text-3xl font-extrabold mb-4 uppercase">Disawar</p>
        <div className="flex items-center gap-3 justify-center max-w-[350px] mx-auto">
          <span className="text-xl font-semibold">
            {disawarData?.yesterday || "--"}
          </span>
          <span className="px-1 border bg-green-500 border-white text-white rounded-md mx-2">
            ➜
          </span>
          <span className="text-xl font-semibold">
            {disawarData?.today || (
              <Image
                className="inline"
                alt="wait icon"
                width={20}
                height={20}
                src="https://b1sattaplay.in/wp-content/uploads/2024/07/d.gif"
              />
            )}
          </span>        </div>
      </div>
      {/* === BOTTOM STATIC SECTION === */}
      <section className="flex flex-col md:flex-row md:space-x-1 bg-white">
        <div className="text-center w-full">
          <div className="bg-gradient py-2.5 m-0 font-semibold">
            <p className="text-4xl max-sm:text-lg mt-2 mb-0 md:my-5 max-md:text-2xl">
              --सीधे सट्टा कंपनी का No 1 खाईवाल--
            </p>
          </div>
          <div className="flex-1 px-2 pt-4 pb-6 text-base font-semibold leading-6 text-gray-900 min-h-1 bg-gradient">
          <p className="uppercase mb-2 font-bold text-base lg:text-xl">♕♕ &nbsp;{setting?.contactName} BHAI KHAIWAL &nbsp;♕♕</p>
            <div className="text-start mx-auto max-w-[300px]">
              {schedule.map((game, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center font-semibold py-0.5"
                >
                  <span className="flex items-center gap-1 text-nowrap">
                    ⏰ {game.name}
                  </span>
                  <span>---------</span>
                  <span className="text-nowrap">{game.time}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xl">💸 Payment Option 💸</p>
            <p>
              PAYTM//BANK TRANSFER//PHONE PAY//GOOGLE PAY =&gt; ⏺️{setting?.paymentNumber}⏺️
              <br />
              ==========================
              <br />
              ==========================
            </p>
            <p>
              🤑Rate list💸
              <br />
              <br />
              जोड़ी रेट 10-------{setting?.rate}
              <br />
              हरूफ रेट 100-----{setting?.rate}
            </p>
            <p className="uppercase">♕♕ &nbsp;{setting?.contactName} BHAI KHAIWAL &nbsp;♕♕</p>
            <p>
              <Link target="_blank" href="https://wa.me/+917206591251">
                Game play करने के लिये नीचे लिंक पर क्लिक करे
              </Link>
            </p>
            <div className="mx-auto max-w-[300px] mt-4 hover:scale-110 transition-all duration-300">
              <Link target="_blank" href={`https://wa.me/+${setting?.whatsappNumber}`}>
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
