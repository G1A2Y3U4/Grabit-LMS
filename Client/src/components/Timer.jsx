import { useState, useEffect } from "react";

function Timer({ duration, onTimeUp }) {

  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const warning = timeLeft <= 30;

  return (

    <div
      className={`px-4 py-2 rounded font-bold text-lg
      ${warning ? "bg-red-500 text-white animate-pulse" : "bg-blue-500 text-white"}`}
    >

      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}

    </div>

  );

}

export default Timer;