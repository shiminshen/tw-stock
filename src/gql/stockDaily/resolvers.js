const resolver = {
  Query: {
    stockDaily: async (_, { stockId, startDate, endDate }, { mongoClient }) => {
      const query = { date: { $gte: startDate, $lte: endDate } }
      const cursor = await mongoClient.db('stockDaily').collection(stockId).find({ })

      const list = await cursor.toArray()
      return list
    }
  }
}

export default resolver
