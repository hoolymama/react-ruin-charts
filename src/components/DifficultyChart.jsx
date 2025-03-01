import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    CHART_DIMENSIONS
} from "../utils/constants";
import * as d3 from "d3";
import PropTypes from "prop-types";
import { formatTime } from "../utils/util";

function DifficultyChart({
    totalDuration,
    values,
    setValues,
    splineColor = "#888",
    controlPointColor = "#f00",
    controlPointRadius = 5,
    editable = true,
    axisColor = "#90caf9",
    labelColor = "#90caf9",
    showTicks = true,
    timeUnit = "timecode"
}) {
    const svgRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: CHART_DIMENSIONS.DIFFICULTY_HEIGHT
    });

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({
                    width,
                    height
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const drawChart = useCallback(() => {
        const margin = CHART_DIMENSIONS.MARGIN;
        const chartWidth = dimensions.width - margin.LEFT - margin.RIGHT;
        const height = dimensions.height - margin.TOP - margin.BOTTOM;

        const xScale = d3
            .scaleLinear()
            .domain([0, totalDuration])
            .range([0, chartWidth]);

        const chartHeight = 1.0;
        const chartHeightTickValues = [0, 0.5, 1];

        const yScale = d3.scaleLinear().domain([0, chartHeight]).range([height, 0]);
        // Create control points data from values array
        const controlPoints = values.map((value, i) => ({
            x: xScale((i * totalDuration) / (values.length - 1)), // Spread across width
            y: yScale(value), // Use passed in y values
            id: i,
        }));

        // Create the spline generator
        const spline = d3
            .line()
            .x((d) => d.x)
            .y((d) => d.y)
            .curve(d3.curveMonotoneX);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Creates a new group element (<g>) inside the SVG and positions it according to the margins.
        // This group will contain all the chart elements (axes, bars etc) and shifts them by the margin amount
        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.LEFT},${margin.TOP})`);

        // Add axis labels
        g.append("text")
            .attr(
                "transform",
                `translate(-${margin.LEFT - 15}, ${height / 2 + 25}) rotate(-90)`
            )
            .attr("fill", labelColor)
            .attr("font-size", "12px")
            .text("Difficulty");

        // Add x-axis label
        g.append("text")
            .attr("transform", `translate(${chartWidth / 2}, ${height + margin.BOTTOM - 10})`)
            .attr("text-anchor", "middle")
            .attr("fill", labelColor)
            .attr("font-size", "12px");

        // Update axis colors
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat(showTicks ? (d) => formatTime(d, timeUnit) : ""))
            .attr("color", axisColor);

        g.append("g")
            .call(d3.axisLeft(yScale).tickValues(chartHeightTickValues))
            .attr("color", axisColor);

        // Add the spline path
        g.append("path")
            .datum(controlPoints)
            .attr("class", "spline")
            .attr("fill", "none")
            .attr("stroke", splineColor)
            .attr("stroke-width", 2)
            .attr("d", spline);

        // Add draggable control points
        if (editable) {
            g.selectAll("circle")
                .data(controlPoints)
                .join("circle")
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y)
                .attr("r", controlPointRadius)
                .attr("fill", controlPointColor)
                .call(
                    d3
                        .drag()
                        .on("drag", function (event, d) {
                            // Constrain y movement between 0 and 1
                            const newY = Math.min(yScale(0.2), Math.max(yScale(1), event.y));
                            d.y = newY;

                            // Update point position
                            d3.select(this).attr("cy", newY);

                            // Update spline
                            svg.select(".spline").attr("d", spline);
                        })
                        .on("end", function () {
                            // Get all control points and convert their y-values back to original scale
                            const newValues = controlPoints.map(
                                (point) => yScale.invert(point.y) // Convert from pixels back to original scale
                            );
                            setValues(newValues);
                        })
                );
        }
    }, [
        totalDuration,
        values,
        setValues,
        dimensions.width,
        dimensions.height,
        timeUnit,
        controlPointRadius,
        controlPointColor,
        splineColor,
        editable,
        axisColor,
        labelColor,
        showTicks
    ]);

    useEffect(() => {
        if (svgRef.current) {
            drawChart();
        }
    }, [drawChart]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
                style={{ display: 'block' }} // This prevents unwanted margins
            />
        </div>
    );
}

// Add PropTypes
DifficultyChart.propTypes = {
    totalDuration: PropTypes.number.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    setValues: PropTypes.func.isRequired,
    splineColor: PropTypes.string,
    controlPointColor: PropTypes.string,
    controlPointRadius: PropTypes.number,
    editable: PropTypes.bool,
    axisColor: PropTypes.string,
    labelColor: PropTypes.string,
    showTicks: PropTypes.bool,
    timeUnit: PropTypes.oneOf(['sec', 'timecode'])
};

export default DifficultyChart; 