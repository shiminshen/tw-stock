const resolver = {
  Query: {
    stockList: async (_, __, { mongoClient }) => {
      const list = await mongoClient
        .db('brokerStockDaily')
        .listCollections()
        .map((I) => I.name)
        .toArray()
      return list
    }
  }
}

export default resolver
