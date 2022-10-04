import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

function startServer({ typeDefs, resolvers }) {
  mongoose.connect('mongodb+srv://<user>:<password>@cluster0.g8pinog.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('database connected'))
    .catch(err => console.log('Databased failed: ', err))

  const server = new ApolloServer({
    typeDefs, resolvers
  })

  server.listen().then(({ url }) => console.log(url)).catch(err => console.log(err))
}

export default startServer;