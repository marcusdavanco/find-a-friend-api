import { makeRegisterPetsUseCase } from '@/use-cases/factories/make-register-pets-use-case'
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
    const registerUseCase = makeRegisterPetsUseCase()

    await registerUseCase.execute({
      name,
      age,
      breed,
      description,
      city,
      organizationId,
    })
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }

  return reply.status(201).send()
}
