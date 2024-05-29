import * as d3 from "d3";
import { motion } from "framer-motion";

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

const xPoints = points.map((p) => p[0]) as number[];
const yPoints = points.map((p) => p[1]) as number[];
const height = 200;
const width = 400;

const styles = {
  height: "100%",
  width: "60%",
};

const margins = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

export default function Test() {
  const xExtent = d3.extent(xPoints) as [number, number];
  const yExtent = d3.extent(yPoints) as [number, number];
  const xScale = d3
    .scaleLinear()
    .domain([xExtent[0], xExtent[1]])
    .range([margins.left, width - margins.right]);
  const yScale = d3
    .scaleLinear()
    .domain([yExtent[0], yExtent[1]])
    .range([height - margins.bottom, 0 + margins.top]);
  const line = d3.line();
  const pathPoints = points.map((point) => [
    xScale(point[0]),
    yScale(point[1]),
  ]) as [number, number][];
  const linePath = line(pathPoints) as string;

  const circles = points.map((point, idx) => {
    const x = xScale(point[0]);
    const y = yScale(point[1]);
    return (
      <motion.circle
        initial={{ cy: height- margins.bottom, opacity: 0, scale: 0 }}
        animate={{ cy: y, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: (idx / points.length) * 1.5 }}
        key={`${x}-${y}`}
        cx={x}
        cy={y}
        r={5}
        fill="white"
        stroke="var(--background-color)"
        strokeWidth={3}
      />
    );
  });

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
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.7, delay: 0.2 }}
          d={linePath}
          fill="none"
          stroke="white"
        />
        {/* Circles */}
        {circles.map((circle) => circle)}
      </svg>
      <p>Test</p>
    </div>
  );
}
