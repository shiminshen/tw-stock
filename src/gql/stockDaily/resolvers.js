export default {
  Query: {
    stockDaily: async (_, { stockId }, { mongoClient }) => {
      const cursor = await mongoClient
      .db('stockDaily')
      .collection(stockId)
      .find({})

      const list = await cursor.toArray()
      return list
    }
  }
}
