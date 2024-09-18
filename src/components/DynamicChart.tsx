import * as d3 from "d3";
import React from "react";
import { motion } from "framer-motion";
import "./Charts.css";

type Points = [number, number][];
const dataPoints: Points = [
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

const height = 200;
const width = 400;

const styles = {
  height: "100%",
  width: "80%",
};

const margins = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

const DynamicChart = () => {
  const [points, setPoints] = React.useState(dataPoints);
  const [circles, setCircles] = React.useState<JSX.Element[]>([]);
  const [path, setPath] = React.useState<JSX.Element>();

  const addRandomDatapoint = () => {
    const x = Math.max(...points.map((p) => p[0])) + 2;
    const y = Math.floor(Math.random() * 20) + 1;
    setPoints([...points, [x, y]]);
  };

  const xPoints = React.useMemo(
    () => dataPoints.map((p) => p[0]) as number[],
    []
  );
  const yPoints = React.useMemo(
    () => dataPoints.map((p) => p[1]) as number[],
    []
  );

  React.useEffect(() => {
    const xExtent = d3.extent(xPoints) as [number, number];
    xExtent[1] *= 2;
    const yExtent = d3.extent(yPoints) as [number, number];
    const xScale = d3
      .scaleLinear()
      .domain([xExtent[0], xExtent[1]])
      .range([margins.left, width - margins.right]);
    const yScale = d3
      .scaleLinear()
      .domain([yExtent[0], yExtent[1]])
      .range([height - margins.bottom, 0 + margins.top]);
    const newPathPoints = points.map((point) => [
      xScale(point[0]),
      yScale(point[1]),
    ]) as [number, number][];

    const line = d3.line();
    const newLinePath = line(newPathPoints) as string;

    // calculate path length (pithagorean theorem)
    // could be optimized by storing the total path length
    let totalPathLength = 0;
    let priorPathLength = 0;
    if (points !== dataPoints && newPathPoints.length > 1) {
      for (let i = 1; i < newPathPoints.length; i++) {
        const x = newPathPoints[i][0];
        const y = newPathPoints[i][1];
        const priorX = newPathPoints[i - 1][0];
        const priorY = newPathPoints[i - 1][1];
        const distance = Math.sqrt(
          Math.pow(x - priorX, 2) + Math.pow(y - priorY, 2)
        );
        totalPathLength += distance;
        if (i === newPathPoints.length - 2) {
          priorPathLength = totalPathLength;
        }
      }
    }

    const initialPathLength =
      points === dataPoints ? 0 : priorPathLength / totalPathLength;

    const pathDuration = points === dataPoints ? 1.7 : 0.2;

    const newPath = (
      <motion.path
        key={newLinePath}
        initial={{ pathLength: initialPathLength }}
        animate={{ pathLength: 1 }}
        transition={{ duration: pathDuration, delay: 0.2 }}
        d={newLinePath}
        fill="none"
        stroke="var(--chart-color)"
      />
    );

    const newCircles = points.map((point, idx) => {
      const delay =
        points === dataPoints
          ? (idx / points.length) * 1.5
          : idx === points.length - 1
          ? 0.2
          : (idx / points.length) * 1.5;
      const x = xScale(point[0]);
      const y = yScale(point[1]);
      return (
        <motion.circle
          className="circle"
          initial={{ cy: height - margins.bottom, opacity: 0, scale: 0 }}
          animate={{ cy: y, opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: delay }}
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={5}
          fill="white"
          stroke="var(--chart-color)"
          strokeWidth={3}
        />
      );
    });
    setCircles(newCircles);
    setPath(newPath);
  }, [points, xPoints, yPoints]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <svg style={styles} viewBox={`0 0 ${width} ${height}`}>
        {/* Line */}
        {path}
        {/* Circles */}
        {circles.map((circle) => circle)}
      </svg>
      <button onClick={addRandomDatapoint}>Add Datapoint</button>
    </div>
  );
};
export default DynamicChart;
