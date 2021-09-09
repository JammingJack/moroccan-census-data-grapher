import React from "react";
import { scaleQuantile, extent, scaleLinear, scaleOrdinal } from "d3";
import * as d3 from "d3";

export const ChoroplethMap = (
  svg,
  geoData,
  areaData,
  data,
  selectedParameters
) => {
  console.log(d3);
  svg.selectAll("g").remove();
  //prepare data
  let refinedGeoData = geoData.filter((value) =>
    selectedParameters.selectedAreas.includes(value[1])
  );
  console.log(selectedParameters);

  let quantizeScale = scaleQuantile()
    .domain(
      extent(
        data.ObservationData.filter(
          (it) =>
            (it[1].search("Province") === 0 ||
              it[1].search("Préfecture") === 0) &&
            it[4] === selectedParameters.selectedIndicators[0] &&
            it[6] === selectedParameters.selectedMilieu[0]
        ).map((it) => it?.[9])
      )
    )
    .range(["#d73027", "#fc8d59", "#fee08b", "#d9ef8b", "#91cf60", "#1a9850"]);

  return (
    <>
      {
        //draw
        svg
          .append("g")
          .attr("class", "map")
          .selectAll("path")
          .data(geoData)
          .join((enter) =>
            enter
              .append("path")
              .attr("d", (d) => d[0])
              .attr("stroke", "black")
              .attr("stroke-width", "2")
              .attr("fill", (d) =>
                refinedGeoData.map(t=>t[0]).includes(d[0])
                  ? quantizeScale(
                      data.ObservationData.filter(
                        (it) =>
                          (it[1].search("Province") === 0 ||
                            it[1].search("Préfecture") === 0) &&
                          it[4] === selectedParameters.selectedIndicators[0] &&
                          it[6] === selectedParameters.selectedMilieu[0]
                      ).find((it) => it[2] === d[1])?.[9]
                    )
                  : "transparent"
              )
              .append("title")
              .text((d) => {
                let areaInfo =
                  areaData.find((item) => item[1] === d[1])?.[2] +
                    "  --  " +
                    data.ObservationData.filter(
                      (it) =>
                        (it[1].search("Province") === 0 ||
                          it[1].search("Préfecture") === 0) &&
                        it[4] === selectedParameters.selectedIndicators[0] &&
                        it[6] === selectedParameters.selectedMilieu[0]
                    ).find((it) => it[2] === d[1])?.[9] || "unkonw";
                return areaInfo;
              })
          )
      }

      {svg
        .append("rect")
        .attr("x", innerWidth * 0.03)
        .attr("y", innerHeight * 0.02)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", 200)
        .attr("height", 30)
        .attr("id", "legend-container")}
    </>
  );
};
