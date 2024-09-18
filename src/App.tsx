import React from "react";
import "./App.css";
import MotionGraph from "./components/MotionChart";

const points: [number, number][] = [
  [2, 0],
  [4, 4],
  [6, 10],
  [8, 20],
  [10, 15],
  [12, 13],
  [14, 18],
  [16, 11],
  [18, 9],
  [20, 5],
];

function App() {
  const [dataPoints, setDataPoints] = React.useState(points);
  return (
    <>
      <h1>React + D3js / SVG + Framer Motion</h1>
      <p>
        Interactive animated graphs become simple with this set of technologies
      </p>
      <MotionGraph dataPoints={dataPoints}/>
    </>
  );
}

export default App;
