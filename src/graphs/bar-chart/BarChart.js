import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  scaleBand,
  scaleLinear,
  max,
  format,
  axisBottom,
  axisRight,
  extent,
} from "d3";

const margin = { top: 20, right: 30, bottom: 65, left: 22 };
const xAxisLabelOffset = 50;

export const BarChart = (
  svg,
  data,
  chartTitle,
  xValueFunction,
  yValueFunction
) => {
  const width = +svg.style("width").slice(0, -2) && 900;

  const height = +svg.style("height").slice(0, -2) && 800;
  console.log(height, width);

  svg.selectAll("g").remove();
  svg.selectAll("rect").remove();
  const xScale = scaleBand()
    .domain(data.map(xValueFunction))
    .range([0, width])
    .padding(0.5);

  const yScale = scaleLinear()
    .domain(extent(data.map(yValueFunction)))
    .range([height, 0])
    .nice();

  const colorScale = scaleLinear()
    .domain(extent(data.map(yValueFunction)))
    .range(["green", "orange", "red"])
    .clamp(true);

  const xAxis = axisBottom(xScale).ticks(data.length);

  //debugger;
  const yAxis = axisRight(yScale);
  const axisElementClasses = ["x-axis", "y-axis"];

  return (
    <React.Fragment>
      {svg
        .selectAll("g")
        .data(axisElementClasses)
        .enter()
        .append("g")
        .attr("class", (d) => d)}

      {svg
        .select(".x-axis")
        .style("transform", `translateY(${height}px`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")}

      {svg
        .select(".y-axis")
        .style("transform", `translateX(${width}px`)
        .call(yAxis)}

      {svg.append('g')
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")

        .style("transform", "scale(1, -1)")
        .attr("x", (province) => xScale(province.name))
        .attr("y", -height)
        .attr("width", xScale.bandwidth())
        .transition()
        .attr("fill", (obj) => colorScale(obj.value))
        .attr("height", (province) => height - yScale(province.value))}
        {svg.selectAll('.bar').data(data).append('title').text(obj=> obj.name + ': ' + format('.2s')(obj.value))}
    </React.Fragment>
  );
};
