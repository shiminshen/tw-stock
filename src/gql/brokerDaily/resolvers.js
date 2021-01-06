import _ from 'lodash/fp'

const aggregateDailyTransactionData = (data, key) => {
  const groupData = _.flow(
    _.groupBy((I) => I[key]),
    _.map((V) => {
      const buy = _.sumBy('buy')(V)
      const sell = _.sumBy('sell')(V)
      const buyCost = _.sumBy((I) => I.buy * I.avgBuyPrice || 0)(V)
      const sellCost = _.sumBy((I) => I.sell * I.avgSellPrice || 0)(V)
      const avgBuyPrice = buyCost / buy || 0
      const avgSellPrice = sellCost / sell || 0
      const profitRate = avgBuyPrice ? ((avgSellPrice - avgBuyPrice) * 100) / avgBuyPrice : 0

      return {
        name: V?.[0]?.name,
        stockId: V?.[0]?.stockId,
        buy,
        sell,
        volume: buy - sell,
        avgBuyPrice,
        avgSellPrice,
        profitRate,
      }
    })
  )(data)
  return groupData
}

const resolver = {
  Query: {
    brokerDaily: async (_, { name, startDate, endDate }, { mongoClient }) => {
      const query = { date: { $gte: startDate, $lte: endDate } }
      // TODO fix db name
      const cursor = await mongoClient.db('brokerStockDaily').collection(name).find(query)
      const list = await cursor.toArray()
      const data = aggregateDailyTransactionData(list, 'stockId')
      return data
    },
    brokerStockDaily: async (_, { stockId, name, startDate, endDate }, { mongoClient }) => {
      const query = { stockId, date: { $gte: startDate, $lte: endDate } }
      // TODO fix db name
      const cursor = await mongoClient.db('brokerStockDaily').collection(name).find(query)
      const list = await cursor.toArray()

      return list.map((I) => ({
        ...I,
        avgBuyPrice: I.avgBuyPrice || 0,
        avgSellPrice: I.avgSellPrice || 0,
        profitRate: I.profitRate || 0,
      }))
    },
  },
}

export default resolver
