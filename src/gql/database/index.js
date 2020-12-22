import { MongoClient } from 'mongodb'

let _client

const MONGO_URI = 'mongodb://localhost:27017/'

export const initMongo = async () => {
  try {
    const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true })
    _client = await client.connect()
    console.log('MongoDb connected!')
  } catch (error) {
    /* Handle error */
    console.error(error)
  }
}

export const getMongoInstance = () => _client
