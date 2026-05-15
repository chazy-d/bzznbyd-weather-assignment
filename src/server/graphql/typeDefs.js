export const typeDefs = `#graphql
  type HealthStatus {
    ok: Boolean!
    service: String!
    version: String!
  }

  type Query {
    health: HealthStatus!
    version: String!
  }
`
