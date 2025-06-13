import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ChartData {
  date: Date;
  value: number;
}
const data: ChartData[] = [
  { date: new Date("2023-01-01"), value: 10 },
  { date: new Date("2023-01-02"), value: 5 },
  { date: new Date("2023-01-03"), value: 15 },
  { date: new Date("2023-01-04"), value: 10 },
  { date: new Date("2023-01-05"), value: 20 },
  { date: new Date("2023-01-06"), value: 25 },
  { date: new Date("2023-01-07"), value: 22 },
  { date: new Date("2023-01-08"), value: 18 },
];

const Chart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 250 });
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions((prev) => ({
          ...prev,
          width: containerRef.current!.clientWidth,
        }));
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !dimensions.width) return;
    const margin = { top: 20, right: 0, bottom: 0, left: 0 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)! + 5])
      .range([chartHeight, 0]);

    const area = d3
      .area<ChartData>()
      .x((d) => xScale(d.date))
      .y0(chartHeight)
      .y1((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const curvedLine = d3
      .line<ChartData>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const straightDottedLine = d3
      .line<ChartData>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    const gradient = g
      .append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ffad99")
      .attr("stop-opacity", 0.7);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff6347")
      .attr("stop-opacity", 0.1);

    g.append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#e54b3c")
      .attr("stroke-width", 2)
      .attr("d", curvedLine);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#a0a0a0")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "3 3")
      .attr("d", straightDottedLine);

    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 5)
      .attr("fill", "#e54b3c");
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl w-full mb-5 overflow-hidden"
    >
      <div className="w-full overflow-hidden">
        <svg
          ref={svgRef}
          id="chart"
          width="100%"
          height={dimensions.height}
        ></svg>
      </div>
    </div>
  );
};

export default Chart;
