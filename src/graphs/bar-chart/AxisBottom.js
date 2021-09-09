import React from "react";
export const AxisBottom = (svg, xScale, innerHeight, tickFormat) => {
  let g = svg
    .append("g")
    .attr("class", "tick")
    .attr("key", tickValue)
    .attr("transform", `translate(${xScale(tickValue)},0)`);
  return (
    <>
      {xScale.ticks().map((tickValue) => {
        g.append("line").attr("y2", innerHeight);
        g.append("text")
          .style("textAnchor", "middle")
          .attr("dy", ".71em")
          .attr("y", innerHeight + 3)
          .text(tickFormat(tickValue));
      })}
    </>
  );
};

/*       <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + 3}>
        {tickFormat(tickValue)}
      </text>
    </g> */
