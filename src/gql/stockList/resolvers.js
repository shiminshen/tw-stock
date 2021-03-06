const resolver = {
  Query: {
    stockList: async (_, __, { mongoClient }) => {
      const list = await mongoClient
        .db('stockBrokerDaily')
        .listCollections()
        .map((I) => I.name)
        .toArray()
      return list
    }
  }
}

export default resolver
