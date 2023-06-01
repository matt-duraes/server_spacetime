import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {boolean, z} from 'zod';
import { request } from "http";

export async function memoriesRoutes(app: FastifyInstance){

  app.get('/memories', async() => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      }
    })
    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0,115).concat('...')
      }
    })
  })

  //Buscar
  app.get('/memories/:id', async(request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const {id} = paramsSchema.parse(request.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })
    return memory
  }) 

  //Criar
  app.post('/memories', async(request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const {content, coverUrl, isPublic} = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data:
      {
        content,
        coverUrl,
        isPublic,
        userId: '96fcd479-0a18-4ee2-b512-cef9467bb551'
      },
    })
    return memory
  })

  //editar
  app.put('/memories/:id', async(request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const {id} = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const {content, coverUrl, isPublic} = bodySchema.parse(request.body)
    const memory = await prisma.memory.update({
      where:{
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic
      },
    })
    return memory
  })

  //deletar
  app.delete('/memories/:id', async(request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const {id} = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      }
    })
  })
}