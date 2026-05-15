import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { resolvers } from '../../src/server/graphql/resolvers'
import { typeDefs } from '../../src/server/graphql/typeDefs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateNextHandler(server)
