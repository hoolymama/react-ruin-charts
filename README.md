# React Ruin Charts

A React component library for visualizing song distributions and difficulty curves.

## Installation

Since this is a private package, you'll need to install it directly from GitHub:

```bash
# Using yarn
yarn add git+https://github.com/yourusername/react-ruin-charts.git

# Using npm
npm install git+https://github.com/yourusername/react-ruin-charts.git
```

## Components

### DifficultyChart

A chart component for visualizing and editing difficulty curves.

```jsx
import { DifficultyChart } from 'react-ruin-charts';

function MyComponent() {
  const [values, setValues] = useState([0.2, 0.5, 0.8, 0.3, 0.6]);
  
  return (
    <DifficultyChart
      totalDuration={300}
      values={values}
      setValues={setValues}
      splineColor="#888"
      controlPointColor="#f00"
      controlPointRadius={5}
      editable={true}
      axisColor="#90caf9"
      labelColor="#90caf9"
      showTicks={true}
      timeUnit="timecode"
    />
  );
}
```

### SongDistributionChart

A chart component for visualizing song distributions.

```jsx
import { SongDistributionChart } from 'react-ruin-charts';

function MyComponent() {
  const songDistribution = [
    {
      title: "Song Title",
      artist: "Artist Name",
      duration: 180,
      price: 10,
      pricePerMin: 3.33,
      color: "#ff0000",
      startTime: 0
    },
    // More songs...
  ];
  
  return (
    <SongDistributionChart
      songDistribution={songDistribution}
      totalDuration={600}
      axisColor="#90caf9"
      labelColor="#90caf9"
      timeUnit="timecode"
      showTicks={true}
    />
  );
}
```

## Hooks

### useSongDistribution

A hook for distributing songs across a timeline based on difficulty values.

```jsx
import { useSongDistribution, SILENCE_POLICIES } from 'react-ruin-charts';

function MyComponent() {
  const songs = [
    {
      title: "Song Title",
      artist: "Artist Name",
      duration: 180,
      price: 10,
      pricePerMin: 3.33,
      color: "#ff0000"
    },
    // More songs...
  ];
  
  const difficultyValues = [0.2, 0.5, 0.8, 0.3, 0.6];
  
  const distributedSongs = useSongDistribution(
    songs,
    600, // totalDuration
    "seed123", // randomSeed
    difficultyValues,
    SILENCE_POLICIES.DISTRIBUTE
  );
  
  return (
    <div>
      {/* Use distributedSongs which now have startTime properties */}
    </div>
  );
}
```

## Utilities

The package also exports various utility functions and constants:

```jsx
import {
  // Constants
  CHART_DIMENSIONS,
  TOOLTIP_STYLES,
  CHART_SCALE,
  TOOLTIP_OFFSET,
  SILENCE_POLICIES,
  
  // Utility functions
  generateRandomColor,
  randomNumberGenerator,
  calculatePricePerMin,
  calculateRandomRange,
  formatTime
} from 'react-ruin-charts';
```

## License

MIT