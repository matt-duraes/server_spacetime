import fastify from 'fastify'
import { PrismaClient } from '@prisma/client';


const app = fastify();
const prisma = new PrismaClient()

//HTTP METHOD:  GET (listar),POST(criar),PUT(atualizar),PATCH(atualizar algo especifico),DELETE
app.get('/users', async() => {
    const users = await prisma.user.findMany()
    return users;
})

app.listen({
    port: 3333
}).then(
    () => {
        console.log('HTTP SERVER RUNNING ON http://localhost:3333')
    }
)