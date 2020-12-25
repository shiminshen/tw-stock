const resolver = {
  Query: {
    stockDaily: async (_, { stockId, startDate, endDate }, { mongoClient }) => {
      const query = { date: { $gte: startDate, $lte: endDate } }
      const cursor = await mongoClient.db('stockBrokerDaily').collection(stockId).find(query)

      const list = await cursor.toArray()
      return list
    }
  }
}

export default resolver
