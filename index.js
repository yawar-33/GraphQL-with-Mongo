const { ApolloServer, gql } = require('apollo-server')
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core')
// import schema
const { typeDefs } = require('./schema')

// dummy database
// const { db } = require('./DB')
const mongoose = require('mongoose')
const MOMGO_URL = 'mongodb://localhost:27017/ecom_dev'

mongoose.connect(MOMGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb')
})

mongoose.connection.on('error', (err) => {
  console.log('error connecting', err)
})

require('./modal/Product')
require('./modal/Category')
require('./modal/Review')
// import Query resolvers
const { Query } = require('./resolvers/Query')
const { Product } = require('./resolvers/Product')
// mutation
const { Mutation } = require('./resolvers/Mutation')

// const db = { Category, Product }
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Mutation,
  },
  context: {
    // db,
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
})

server.listen().then(({ url }) => {
  console.log('Server is up at ' + url)
})
