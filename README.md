# React Ruin Charts

A React component library for creating song distributions based on difficulty curves.

## Installation

Since this is a private package, you'll need to install it directly from GitHub:

```bash
# Using yarn
yarn add git+https://github.com/hoolymama/react-ruin-charts.git

# Using npm
npm install git+https://github.com/hoolymama/react-ruin-charts.git
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


* `totalDuration`: Number of seconds from start to end.
* `values`: The array of Y coordinates for the control points. X coordinates are evenly spaced from the start to the end of the duration.
* `setValues`: Callback function to update the values array when control points are moved
* `splineColor`: Color of the difficulty curve line (CSS color string)
* `controlPointColor`: Color of the control points (CSS color string)
* `controlPointRadius`: Radius of the control points in pixels
* `editable`: Whether the curve can be modified by dragging control points
* `axisColor`: Color of the chart axes (CSS color string)
* `labelColor`: Color of the axis labels (CSS color string)
* `showTicks`: Whether to show tick marks on the axes
* `timeUnit`: Format for time display ('timecode' or 'seconds')



### SongDistributionChart

A chart component for visualizing song distributions.

```jsx
import { SongDistributionChart } from 'react-ruin-charts';

function MyComponent() {
  const songDistribution = [
    {
      title: "Song Title",
      artist: "Artist Name",
      duration: 180, // seconds
      price: 10, // Value of the song in dollars
      pricePerMin: 3.33, //  // Value of each minute of the song in dollars
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

* `songDistribution`: Array of song objects with properties like title, artist, duration, price, pricePerMin, color, and startTime
* `totalDuration`: Number of seconds for the total timeline
* `axisColor`: Color of the chart axes (CSS color string)
* `labelColor`: Color of the axis labels (CSS color string)
* `timeUnit`: Format for time display ('timecode' or 'seconds')
* `showTicks`: Whether to show tick marks on the axes


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

Songs are distributed such that the most valuable songs occupy the most difficult positions on the timeline. The difficulty at any point on the timeline is calculated by linearly interpolating control points of the difficulty curve. 

If the control points all have the same value, then the curve is constant. in this case, songs are distributed a random. You may change the random seed.

The songs that make it onto the timeline are the most valuable (per minute) songs that fit completely at some position on the timeline. Other songs are discarded. It is rare that the selected songs fill the timeline exactly. For this reason there can be silent sections, usually on the least difficult areas. For this reason, there are options to either spread the silent areas evenly between songs, or stack songs next to each other from the start of the timeline.   

* `songs`: The array of songs to distribute
* `totalDuration`: The total duration in seconds for the timeline
* `randomSeed`: A string used to ensure consistent random distribution.
* `difficultyValues`: An array of numbers (0-1) representing the difficulty curve of the timeline
* `silencePolicy`: Determines how silence is handled between songs. Use the `SILENCE_POLICIES` constant. Options are:
  * `DISTRIBUTE`: Evenly distributes silence between all songs across the timeline
  * `STACK_FROM_START`: Places songs back-to-back starting from the beginning of the timeline
  * `IGNORE`: Maintains the original placement of songs based on the difficulty curve

## Utilities

The package exports various utility functions and constants:

```jsx
import {
  // Constants
  CHART_DIMENSIONS,
  TOOLTIP_STYLES,
  CHART_SCALE,
  TOOLTIP_OFFSET,
  SILENCE_POLICIES,
  
  // Utility functions
  calculatePricePerMin,
  formatTime

  // Seeded random number generator
  RandomNumber,
} from 'react-ruin-charts';
```

### RandomNumber

A seedable random number generator that provides deterministic randomness:

```jsx
import { RandomNumber } from 'react-ruin-charts';

// Create a random number generator with a specific seed
const rng = RandomNumber('my-seed');

// Create a random number generator with a time-based seed
// (automatically generated if no seed is provided)
const autoSeededRng = RandomNumber();

// Generate a random number between 0 and 1
const randomValue = rng.inRange();

// Generate a random number in a custom range
const customRange = rng.inRange({ min: 10, max: 20 });

// Generate a random integer
const randomInt = rng.intInRange({ min: 1, max: 100 });

// Generate a random color
const randomColor = rng.colorHex();

// Generate a random blue color
const blueColor = rng.colorHex({ 
  minHue: 180, 
  maxHue: 240, 
  minSaturation: 0.8 
});
```

When no seed is provided, a seed string is automatically generated based on the current time (to the millisecond). This provides non-deterministic randomness when desired, while still allowing for deterministic sequences when a specific seed is provided.



## Development

This project uses [Husky](https://typicode.github.io/husky/) to ensure the distribution files are always up-to-date when pushing to the repository.

### Automatic Builds Before Pushing

A pre-push Git hook is configured to automatically run the build process before pushing your changes to the repository. This ensures that the `dist` directory is always up-to-date with the latest source code changes.

When you run `git push`, the following happens:
1. The pre-push hook is triggered
2. The build process runs (`yarn build`)
3. If the build succeeds, the push continues
4. If the build fails, the push is aborted

### Setting Up Husky After Cloning

When you clone the repository, Husky will be automatically set up when you run `yarn install` or `npm install` due to the `prepare` script in package.json.

### Manual Development

During development, you can use the following commands:

```bash
# Run the build once
yarn build

# Run the build in watch mode (rebuilds on file changes)
yarn dev

# Run the smoke test
yarn test
```

### Testing

The project uses Jest for testing. Tests are located in the `tests` directory and include:

- Unit tests for the `RandomNumber` utility, demonstrating:
  - Successive calls produce different values
  - The same seed produces the same sequence of values
  - Different seeds produce different sequences
  - Custom parameters work correctly

To run the tests:

```bash
yarn test
```

This will run all tests in the `tests` directory and provide coverage information.

## License

MIT