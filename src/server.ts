import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'


const app = fastify()

app.register(memoriesRoutes)
app.register(cors,{
    origin: true, // todas as URLs de front-end poderão acessar nosso back-end
    // ['http://lolcalcahost:3000','https:mateusduraes.dev'] especificando algumas
})
app.listen({
    port: 3333
}).then(
    () => {
        console.log('HTTP SERVER RUNNING ON http://localhost:3333')
    }
)