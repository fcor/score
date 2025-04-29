import { useState, useEffect } from "react";
import "./App.css";
import homeCrest from "./assets/REAL-CARTAGENA.png";
import awayCrest from "./assets/ATLETICO-HUILA.png";

function App() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [matchPeriod, setMatchPeriod] = useState("Primer Tiempo");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 45 && matchPeriod === "Primer tiempo") {
                setIsPlaying(false);
                setMatchPeriod("Descanso");
                return prevMinutes;
              } else if (prevMinutes === 45 && matchPeriod === "Segundo tiempo") {
                setIsPlaying(false);
                setMatchPeriod("Terminado");
                return prevMinutes;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, matchPeriod]);

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case " ": // Space to toggle play/pause
          setIsPlaying((prev) => !prev);
          break;
        case "h": // 'h' to increment home score
          setHomeScore((prev) => prev + 1);
          break;
        case "a": // 'a' to increment away score
          setAwayScore((prev) => prev + 1);
          break;
        case "r": // 'r' to reset
          setMinutes(0);
          setSeconds(0);
          setHomeScore(0);
          setAwayScore(0);
          setMatchPeriod("Primer tiempo");
          break;
        case "2": // '2' to start second half
          setMinutes(0);
          setSeconds(0);
          setMatchPeriod("Segundo tiempo");
          setIsPlaying(true);
          break;
        case "d": // '2' to start second half
          setMinutes(0);
          setSeconds(0);
          setMatchPeriod("Descanso");
          setIsPlaying(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [matchPeriod]);

  return (
    <div className="container column">
      <div className="score-card">
        <div className="score-top row">
          <div className="score-time row">
            <p className="period">{matchPeriod}</p>
            <p className="time">{formatTime(minutes, seconds)}</p>
          </div>
          {isPlaying && (
            <p className="live-indicator">
              Live <span>🔴</span>{" "}
            </p>
          )}
        </div>
        <div className="score-main row">
          <div className="team column">
            <img src={homeCrest} alt="crest home team" />
            <p className="team-name">REAL CARTAGENA</p>
          </div>
          <p className="score-number">{homeScore}</p>
          <p className="colon">:</p>
          <p className="score-number">{awayScore}</p>
          <div className="team column">
            <img src={awayCrest} alt="crest home team" />
            <p className="team-name">ATLETICO HUILA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
