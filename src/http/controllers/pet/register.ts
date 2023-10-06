import { makeRegisterPetsUseCase } from '@/use-cases/factories/make-register-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const registerBodySchema = z.object({
    species: z.string(),
    name: z.string(),
    age: z.string(),
    size: z.string(),
    independency: z.string(),
    description: z.string().optional(),
    city: z.string(),
  })

  const {
    sign: { sub: orgId },
  } = request.user

  const { species, name, age, size, independency, description, city } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterPetsUseCase()

    await registerUseCase.execute({
      species,
      name,
      age,
      size,
      independency,
      description,
      city,
      orgId,
    })
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }

  return reply.status(201).send()
}
