import { registerPetUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
    description: z.string().optional(),
    city: z.string(),
    organizationId: z.string().optional(),
  })

  const { name, age, breed, description, city, organizationId } =
    registerBodySchema.parse(request.body)

  try {
    await registerPetUseCase({
      name,
      age,
      breed,
      description,
      city,
      organizationId,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
