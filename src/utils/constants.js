// Constants for chart dimensions and styling

const CHART_DIMENSIONS = {
    WIDTH: 1000,
    HEIGHT: 150,
    DIFFICULTY_HEIGHT: 100,
    MARGIN: {
        TOP: 10,
        RIGHT: 30,
        BOTTOM: 30,
        LEFT: 50,
    },
};

const TOOLTIP_STYLES = {
    BACKGROUND_COLOR: "#222",
    BORDER: "1px solid #ddd",
    BORDER_RADIUS: "4px",
    PADDING: "10px",
    FONT_SIZE: "12px",
    BOX_SHADOW: "0 2px 4px rgba(0,0,0,0.1)",
};

const CHART_SCALE = {
    HEIGHT_DIVISOR: 4,
    HEIGHT_INTERVALS: [0, 0.25, 0.5, 0.75, 1],
};

const TOOLTIP_OFFSET = {
    TOP: -10,
    LEFT: 10,
};

const SILENCE_POLICIES = {
    IGNORE: "silencePolicyIgnore",
    DISTRIBUTE: "silencePolicyDistribute",
    STACK_FROM_START: "silencePolicyStackFromStart"
};

export {
    CHART_DIMENSIONS,
    TOOLTIP_STYLES,
    CHART_SCALE,
    TOOLTIP_OFFSET,
    SILENCE_POLICIES
}; 