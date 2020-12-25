import _ from 'lodash/fp'

const aggregateDailyTransactionData = (data, key) => {
  const groupData = _.flow(
    _.groupBy((I) => I[key]),
    _.map((V) => {
      const buy = _.sumBy('buy')(V)
      const sell = _.sumBy('sell')(V)
      const buyCost = _.sumBy((I) => I.buy * I.avgBuyPrice || 0)(V)
      const sellCost = _.sumBy((I) => I.sell * I.avgSellPrice || 0)(V)

      return {
        [key]: V?.[0]?.[key],
        buy,
        sell,
        volume: buy - sell,
        avgBuyPrice: buyCost / buy || 0,
        avgSellPrice: sellCost / sell || 0,
      }
    })
  )(data)
  return groupData
}

const resolver = {
  Query: {
    stockDaily: async (_, { stockId, startDate, endDate }, { mongoClient }) => {
      const query = { date: { $gte: startDate, $lte: endDate } }
      // TODO fix db name
      const cursor = await mongoClient.db('stockBrokerDaily').collection(stockId).find(query)
      const list = await cursor.toArray()
      const data = aggregateDailyTransactionData(list, 'name')
      return data
    },
  },
}

export default resolver
