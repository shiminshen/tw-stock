const resolver = {
  Query: {
    stockDaily: async (_, { stockId, startDate, endDate }, { mongoClient }) => {
      const query = { stockId, startDate: { $gte: startDate }, endDate: { $gte: endDate } }
      const cursor = await mongoClient.db('stockDaily').collection(stockId).find(query)

      const list = await cursor.toArray()
      return list
    }
  }
}

export default resolver
