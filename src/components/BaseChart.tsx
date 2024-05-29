import d3 from "d3";

const points: [number, number][] = [
  [2, 0],
  [4, 0],
  [6, 0],
  [8, 0],
  [10, 0],
  [12, 0],
  [14, 0],
  [16, 0],
  [18, 0],
  [20, 0],
];

const height = 200;
const width = 400;

const styles = {
  height: "100%",
  width: "100%",
};

export const BaseChart = () => {
  const line = d3.line();
  const linePath = line(points) as string;
  return (
    <div style={{width: "100%"}}>
      <svg style={styles} viewBox={`0 0 ${width} ${height}`}>
        <path d={linePath} fill="none" stroke="black" />
      </svg>
    </div>
  );
};
