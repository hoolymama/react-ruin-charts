"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import {
    CHART_DIMENSIONS,
    TOOLTIP_STYLES,
    CHART_SCALE,
    TOOLTIP_OFFSET,
} from "../utils/constants";
import { formatTime } from "../utils/util";

function SongDistributionChart({
    songDistribution,
    totalDuration,
    axisColor,
    labelColor,
    timeUnit = "timecode", // sec, timecode
    showTicks = true
}) {
    const svgRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: CHART_DIMENSIONS.HEIGHT
    });

    const maxPricePerMin = Math.max(
        ...songDistribution.map((song) => song.pricePerMin)
    );


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

        if (!dimensions.width || !dimensions.height) return;

        const margin = CHART_DIMENSIONS.MARGIN;
        const chartWidth = Math.max(0, dimensions.width - margin.LEFT - margin.RIGHT);
        const height = Math.max(0, dimensions.height - margin.TOP - margin.BOTTOM);

        if (chartWidth <= 0 || height <= 0) return;

        const xScale = d3
            .scaleLinear()
            .domain([0, totalDuration])
            .range([0, chartWidth]);

        const chartHeight =
            Math.ceil(maxPricePerMin / CHART_SCALE.HEIGHT_DIVISOR) *
            CHART_SCALE.HEIGHT_DIVISOR;
        const chartHeightTickValues = CHART_SCALE.HEIGHT_INTERVALS.map(
            (interval) => chartHeight * interval
        );

        const yScale = d3.scaleLinear().domain([0, chartHeight]).range([height, 0]);

        const yScaleHeight = d3
            .scaleLinear()
            .domain([0, chartHeight])
            .range([0, height]);

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
                `translate(-${margin.LEFT - 15}, ${height / 2 + 10}) rotate(-90)`
            )
            .attr("fill", labelColor)
            .attr("font-size", "12px")
            .text("$/min");

        g.append("text")
            .attr(
                "transform",
                `translate(${chartWidth / 2 - 10}, ${height + margin.BOTTOM})`
            )
            .attr("fill", labelColor)
            .attr("font-size", "12px")
        // .text(timeUnit === 'timecode' ? "Duration (tc)" : "Duration (sec)");

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat(showTicks ? (d) => formatTime(d, timeUnit) : ""))
            .attr("color", axisColor);

        g.append("g")
            .call(d3.axisLeft(yScale).tickValues(chartHeightTickValues))
            .attr("color", axisColor);

        const createTooltip = () => {
            return d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", TOOLTIP_STYLES.BACKGROUND_COLOR)
                .style("border", TOOLTIP_STYLES.BORDER)
                .style("border-radius", TOOLTIP_STYLES.BORDER_RADIUS)
                .style("padding", TOOLTIP_STYLES.PADDING)
                .style("font-size", TOOLTIP_STYLES.FONT_SIZE)
                .style("box-shadow", TOOLTIP_STYLES.BOX_SHADOW);
        };

        const tooltip = createTooltip();

        g.selectAll("rect")
            .data(songDistribution)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.startTime))
            .attr("width", (d) => xScale(d.duration))
            .attr("y", (d) => yScale(d.pricePerMin))
            .attr("height", (d) => yScaleHeight(d.pricePerMin))
            .attr("fill", (d) => d.color)
            // Add mouse events for tooltip
            .on("mouseover", (event, d) => {
                tooltip.style("visibility", "visible").html(`
            <strong>${d.title}</strong><br/>
            <hr/>
            Artist: ${d.artist}<br/>
            Duration: ${formatTime(d.duration, timeUnit)}<br/>
            Price: $${d.price.toFixed(2)}<br/>
            Price/min: $${d.pricePerMin.toFixed(2)}
          `);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("top", event.pageY + TOOLTIP_OFFSET.TOP + "px")
                    .style("left", event.pageX + TOOLTIP_OFFSET.LEFT + "px");
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });
    }, [songDistribution, 
        totalDuration, 
        maxPricePerMin, 
        dimensions.width, 
        dimensions.height, 
        axisColor, 
        labelColor, 
        showTicks, 
        formatTime,
        timeUnit]);

    useEffect(() => {
        if (svgRef.current) {
            drawChart();
        }
    }, [drawChart]);

    useEffect(() => {
        return () => {
            d3.select(".tooltip").remove();
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
                style={{ display: 'block' }}
            />
        </div>
    );
}

// Add PropTypes
SongDistributionChart.propTypes = {
    songDistribution: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            pricePerMin: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
            startTime: PropTypes.number.isRequired,
        })
    ).isRequired,
    totalDuration: PropTypes.number.isRequired,
    axisColor: PropTypes.string,
    labelColor: PropTypes.string,
    timeUnit: PropTypes.oneOf(['sec', 'timecode']),
    showTicks: PropTypes.bool,
};

export default SongDistributionChart; 