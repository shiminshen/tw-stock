import React, { useMemo } from 'react'
import { letterFrequency } from '@visx/mock-data'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { LinePath } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisBottom, AxisLeft, AxisRight } from '@visx/axis'

// We'll use some mock data from `@visx/mock-data` for this.
// const data = letterFrequency;
const blackColor = '#000000'

const PriceCurve = ({ data, yMax, xMax }) => {
  const yPriceScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [Math.min(...data.map(y)), Math.max(...data.map(y))]
      }),
    [yMax, y]
  )
}

const StockChart = ({
  width = 500,
  height = 500,
  margin = { top: 40, left: 100, right: 40, bottom: 100 },
  data = []
}) => {
  // Bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const x = (I) => Number(I.date)
  const y = (I) => Number(I.volume)
  const yPrice = (I) => (I.volume > 0 ? Number(I.avgBuyPrice) : Number(I.avgSellPrice))

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

  const yPriceScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [Math.min(...data.map(yPrice)), Math.max(...data.map(yPrice))]
      }),
    [yMax, y]
  )

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => (data) => scale(accessor(data))
  const xPoint = compose(xScale, x)
  const yPoint = compose(yScale, y)
  const yPricePoint = compose(yPriceScale, yPrice)

  console.log(data)
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
          </Group>
        )
      })}
      <Group top={margin.top} left={margin.left}>
        <LinePath
          stroke="#00f"
          strokeWidth={2}
          data={data}
          x={(d) => xPoint(d)}
          y={(d) => yPricePoint(d)}
        />
        <AxisRight
          left={xMax}
          scale={yPriceScale}
          stroke={blackColor}
          tickStroke={blackColor}
          tickLabelProps={() => ({
            fill: blackColor,
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em'
          })}
        />
        <AxisLeft
          scale={yScale}
          stroke={blackColor}
          tickStroke={blackColor}
          tickLabelProps={() => ({
            fill: blackColor,
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em'
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
    </svg>
  )
}

export default StockChart
