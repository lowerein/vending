"use client";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Vending() {
  const { data: session, status } = useSession();

  const clickHandler = async (index: number) => {
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const putData = async () => {
      const url =
        "https://wsp-api-819a8-default-rtdb.asia-southeast1.firebasedatabase.app/motor.json";
      await fetch(url, { method: "PUT", body: (index + 1).toString() });
      return;
    };

    const waitPoint = async (location: string) => {
      const url = "/api/temi";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: `GOTO_${location}` }),
      });

      while (true) {
        const response = await fetch("/api/temi");
        const result = await response.json();
        console.log(result);
        await delay(1000);
        if (result?.status === "complete" && result?.location === location)
          break;
      }
    };

    const fetchData = async () => {
      const url =
        "https://wsp-api-819a8-default-rtdb.asia-southeast1.firebasedatabase.app/motor.json";

      while (true) {
        const response = await fetch(url);
        const result = await response.json();
        await delay(1000);
        if (result === 0) {
          await delay(5000);
          break;
        }
      }

      return;
    };

    const saySpeech = async (speech: string) => {
      const url = "/api/temi";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: `SAY_${speech}` }),
      });
    };

    setShowBackdrop(true);
    await waitPoint("p2");
    await putData();
    await fetchData();
    await waitPoint("p3");
    await saySpeech("Your package has been arrived.");
    await delay(10000);
    setShowBackdrop(false);
    await waitPoint("p2");
  };

  const [showBackdrop, setShowBackdrop] = useState(false);
  const date = new Date();

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [status]);

  const content = (
    <>
      <div
        className={`h-0 sticky top-0 transition-opacity ${
          !showBackdrop ? "opacity-0 hidden" : "opacity-100"
        }`}
      >
        <div className="flex w-full h-screen bg-slate-700/70 text-white text-4xl sm:text-8xl">
          <div className="flex mx-auto my-auto">LOADING...</div>
        </div>
      </div>

      <div className="flex flex-col w-full min-h-screen mx-auto my-auto">
        <div className="w-full bg-slate-700 text-white font-bold text-2xl">
          <div className="flex flex-row justify-between w-full p-5">
            <div className="my-auto">WFYL</div>
            <div className="flex flex-col text-sm justify-end">
              <div>{date.toISOString().substring(0, 10)}</div>
              {session ? (
                <div>
                  <button onClick={() => signOut()}>Sign out</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => signIn()}>Sign in</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-auto h-full flex-1 p-16 w-full sm:p-24 grid grid-flow-row grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-10 mx-auto">
          {Array.from(Array(5).keys()).map((index) => (
            <button
              onClick={() => clickHandler(index)}
              className="w-full h-64 my-auto flex rounded-xl shadow-xl border border-slate-400 group hover:bg-slate-300 transition-all"
              key={index}
            >
              <div className="flex mx-auto my-auto text-4xl font-semibold group-hover:scale-125 transition-all">
                Item {index + 1}
              </div>
            </button>
          ))}
        </div>

        <div className="w-full bg-slate-700 h-16"></div>
      </div>
    </>
  );

  return status === "authenticated" && content;
}
