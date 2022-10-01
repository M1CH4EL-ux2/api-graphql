const { ApolloServer, gql } = require('apollo-server')
const { randomUUID } = require('node:crypto')

const typeDefs = gql`

  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    posts: [Post!]!

    getUserByEmail(email: String!): User!
  }


  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`

const users = [
  {_id: randomUUID(), name: 'Michael', email: 'michael@gmail.com', active: true},
  {_id: randomUUID(), name: 'Michael2', email: 'michael1@gmail.com', active: false},
  {_id: randomUUID(), name: 'Michael3', email: 'michael2@gmail.com', active: true},
]

const resolvers = {
  Query: {
    hello: () => 'hello world!',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email)
    }
  },

  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: randomUUID(),
        name: args.name,
        email: args.email,
        active: true
      }

      return newUser
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`${url}`))
