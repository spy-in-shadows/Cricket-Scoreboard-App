import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import ScoreButton from "./components/ScoreButton";
import ActionButton from "./components/ActionButton";
import StatusMessage from "./components/StatusMessage";

export default function App() {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [ballsBowled, setBallsBowled] = useState(0);
  const [message, setMessage] = useState("2nd innings started");

  const target = 101;
  const maxOvers = 20;
  const maxBalls = maxOvers * 6;
  const maxWickets = 10;

  const completedOvers = Math.floor(ballsBowled / 6);
  const currentBall = ballsBowled % 6;
  const oversDisplay = `${completedOvers}.${currentBall}`;
  const ballsLeft = maxBalls - ballsBowled;

  const isMatchOver =
    score >= target || wickets >= maxWickets || ballsBowled >= maxBalls;

  const updateMessage = (newScore, newWickets, newBalls) => {
    if (newScore >= target) {
      setMessage(`India wins -- score: ${newScore}`);
    } else if (newWickets >= maxWickets) {
      setMessage(`All out -- score: ${newScore}`);
    } else if (newBalls >= maxBalls) {
      setMessage(`Innings over -- score: ${newScore}`);
    } else {
      setMessage("Match in progress");
    }
  };

  const addRuns = (runs) => {
    if (isMatchOver) return;

    const newScore = score + runs;
    const newBalls = ballsBowled + 1;

    setScore(newScore);
    setBallsBowled(newBalls);
    updateMessage(newScore, wickets, newBalls);
  };

  const addWicket = () => {
    if (isMatchOver) return;

    const newWickets = wickets + 1;
    const newBalls = ballsBowled + 1;

    setWickets(newWickets);
    setBallsBowled(newBalls);
    updateMessage(score, newWickets, newBalls);
  };

  const addNoBall = () => {
    if (isMatchOver) return;

    const newScore = score + 1;
    setScore(newScore);
    updateMessage(newScore, wickets, ballsBowled);
  };

  const addWideBall = () => {
    if (isMatchOver) return;

    const newScore = score + 1;
    setScore(newScore);
    updateMessage(newScore, wickets, ballsBowled);
  };

  const resetMatch = () => {
    setScore(0);
    setWickets(0);
    setBallsBowled(0);
    setMessage("1st innings started");
  };

  return (
    <div className="page">
      <div className="scoreboard-card">
        <Header />

        <div className="top-row">
          <InfoBox label="score:" value={score} />
          <InfoBox label="wicket:" value={wickets} />
          <InfoBox label="overs:" value={oversDisplay} />
          <InfoBox label="Balls:" value={ballsLeft} />
        </div>

        <div className="runs-row">
          <ScoreButton value={0} onClick={() => addRuns(0)} disabled={isMatchOver} />
          <ScoreButton value={1} onClick={() => addRuns(1)} disabled={isMatchOver} />
          <ScoreButton value={2} onClick={() => addRuns(2)} disabled={isMatchOver} />
          <ScoreButton value={3} onClick={() => addRuns(3)} disabled={isMatchOver} />
          <ScoreButton value={4} onClick={() => addRuns(4)} disabled={isMatchOver} />
          <ScoreButton value={6} onClick={() => addRuns(6)} disabled={isMatchOver} />

          <ActionButton text="No ball" onClick={addNoBall} disabled={isMatchOver} />
          <ActionButton text="Wide ball" onClick={addWideBall} disabled={isMatchOver} />
        </div>

        <div className="action-row">
          <ActionButton text="Add wicket" onClick={addWicket} disabled={isMatchOver} />
          <ActionButton text="Reset match" onClick={resetMatch} />
        </div>

        <StatusMessage message={message} />

        <div className="bottom-info">
          <span>Target: {target}</span>
          <span>Max Overs: {maxOvers}</span>
          <span>Wickets Left: {Math.max(0, maxWickets - wickets)}</span>
        </div>
      </div>
    </div>
  );
}