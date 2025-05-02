import { useState, useEffect } from "react";
import "./App.css";
import homeCrest from "./assets/REAL-CARTAGENA.png";
import awayCrest from "./assets/ATLETICO-HUILA.png";

function App() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [matchPeriod, setMatchPeriod] = useState("Primer tiempo");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        // Update both seconds and minutes in a single tick
        if (seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, matchPeriod, seconds, minutes]);

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case " ": 
          setIsPlaying((prev) => !prev);
          break;
        case "h": 
          setHomeScore((prev) => prev + 1);
          break;
        case "a": 
          setAwayScore((prev) => prev + 1);
          break;
        case "n": 
          setHomeScore((prev) => Math.max(0, prev - 1));
          break;
        case "z": 
          setAwayScore((prev) => Math.max(0, prev - 1));
          break;
        case "r":
          setMinutes(0);
          setSeconds(0);
          setHomeScore(0);
          setAwayScore(0);
          setMatchPeriod("Primer tiempo");
          break;
        case "1": 
          setMinutes(0);
          setSeconds(0);
          setMatchPeriod("Primer tiempo");
          setIsPlaying(true);
          break;
        case "2": 
          setMinutes(0);
          setSeconds(0);
          setMatchPeriod("Segundo tiempo");
          setIsPlaying(true);
          break;
        case "d": 
          setMinutes(0);
          setSeconds(0);
          setMatchPeriod("Descanso");
          setIsPlaying(true);
          break;
        case "t":
          setMinutes(90);
          setSeconds(0);
          setMatchPeriod("Terminado");
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [matchPeriod]);

  return (
    <div className="container column">
      <h1 className="title">Área de Candela</h1>
      <div className="score-card">
        <div className="score-top row">
          <div className="score-time row">
            <p className="period">{matchPeriod}</p>
            <p className="time">{formatTime(minutes, seconds)}</p>
          </div>
          {isPlaying && (
            <p className="live-indicator">
              En Vivo <span>⚪️</span>{" "}
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
