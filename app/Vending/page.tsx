"use client";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Vending() {
  const clickHandler = (index: number) => {
    const putData = async () => {
      const url =
        "https://wsp-api-819a8-default-rtdb.asia-southeast1.firebasedatabase.app/motor.json";
      await fetch(url, { method: "PUT", body: (index + 1).toString() });
    };

    setShowBackdrop(true);
    putData();
  };

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [date, setDate] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => setDate(moment()), 1000);
    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    const url =
      "https://wsp-api-819a8-default-rtdb.asia-southeast1.firebasedatabase.app/motor.json";

    const intervalId = setInterval(
      () =>
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data === 0) setShowBackdrop(false);
          }),
      1000
    );
    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex flex-col w-full h-screen mx-auto my-auto">
      <div
        className={`w-full h-screen flex bg-slate-700/50 absolute transition-opacity ${
          !showBackdrop ? "opacity-0 hidden" : "opacity-100"
        }`}
      >
        <div className="flex mx-auto my-auto text-white text-8xl">
          LOADING...
        </div>
      </div>

      <div className="w-full p-5 bg-slate-700 text-white font-bold text-2xl">
        <div className="flex flex-row justify-between">
          <div>WFYL</div>
          <div className="flex flex-col text-sm">
            <div>{date.format("D/MM/YYYY")}</div>
            <div>{date.format("h:mm:ss a")}</div>
          </div>
        </div>
      </div>

      <div className="w-full grow bg-white h-full mx-auto">
        <div className="p-24 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-items-center mx-auto w-full h-full">
          {Array.from(Array(10).keys()).map((index) => (
            <button
              onClick={() => clickHandler(index)}
              className="mt-auto w-full h-full flex rounded-xl shadow-xl border border-slate-400 group hover:bg-slate-300 transition-all"
              key={index}
            >
              <div className="flex mx-auto my-auto text-4xl font-semibold group-hover:scale-125 transition-all">
                Item {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-slate-700 h-16"></div>
    </div>
  );
}
