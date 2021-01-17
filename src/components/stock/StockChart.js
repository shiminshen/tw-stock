import React, { useMemo } from 'react'
import { letterFrequency } from '@visx/mock-data'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'

// We'll use some mock data from `@visx/mock-data` for this.
// const data = letterFrequency;
const blackColor = '#000000'

const StockChart = ({
  width = 500,
  height = 500,
  margin = { top: 40, left: 100, right: 40, bottom: 100 },
  data = []
}) => {
  const x = (I) => Number(I.date)
  const y = (I) => Number(I.volume)

  // Bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

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
        return (
          <Group key={`bar-${i}`} top={margin.top} left={margin.left}>
            <Bar
              x={xPoint(d)}
              y={yScale(Math.max(0, y(d)))}
              height={Math.abs(yPoint(d) - yScale(0))}
              width={xScale.bandwidth()}
              fill={y(d) > 0 ? '#fc2e1c' : '#00ff00'}
            />
            <AxisLeft
              scale={yScale}
              stroke={blackColor}
              tickStroke={blackColor}
              tickLabelProps={() => ({
                fill: blackColor,
                fontSize: 11,
                textAnchor: 'end',
                dy: '0.33em',
              })}
            />
            <AxisBottom
              top={yMax}
              scale={xScale}
              stroke={blackColor}
              numTicks={5}
              tickStroke={blackColor}
              tickLabelProps={() => ({
                fill: blackColor,
                fontSize: 11,
                textAnchor: 'middle'
              })}
            />
          </Group>
        )
      })}
    </svg>
  )
}

export default StockChart
