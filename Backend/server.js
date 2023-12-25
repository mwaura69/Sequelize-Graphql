import cors from 'cors'
import express from 'express'
import { resolvers} from './models/resolver.js'
import { typeDefs } from './models/schema.js'
import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import router from './routes/route.js'

const app = express()
app.use(cors())
app.use(express.json())


const server = new ApolloServer({
    schema: buildSubgraphSchema({typeDefs, resolvers})
})

await server.start()
app.use('/graphql', cors(), expressMiddleware(server));
app.use('/', router)


app.listen(5001, () => {
    console.log('listening on port 5001')
})
