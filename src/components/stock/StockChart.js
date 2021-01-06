import React, { useMemo } from 'react'
import { letterFrequency } from '@visx/mock-data'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'

// We'll use some mock data from `@visx/mock-data` for this.
// const data = letterFrequency;

const StockChart = ({ width = 500, height = 500, data = [] }) => {
  const x = (I) => Number(I.date)
  const y = (I) => Number(I.volume)

  // Bounds
  const xMax = width
  const yMax = height

  // Scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(x),
        padding: 0.4
      }),
    [xMax, x]
  )

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [Math.min(...data.map(y)), Math.max(...data.map(y))]
      }),
    [yMax, y]
  )

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data))
  const xPoint = compose(xScale, x)
  const yPoint = compose(yScale, y)

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        console.log(y(d), yPoint(d))
        const barHeight = yMax - yPoint(d)
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xScale(x(d))}
              y={yMax - Math.max(0, yPoint(d))}
              height={Math.abs(yPoint(d))}
              width={xScale.bandwidth()}
              fill={y(d) > 0 ? '#fc2e1c' : '#00ff00'}
            />
          </Group>
        )
      })}
    </svg>
  )
}

export default StockChart
