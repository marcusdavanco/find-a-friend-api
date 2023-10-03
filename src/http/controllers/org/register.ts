import { makeRegisterOrgsUseCase } from '@/use-cases/factories/make-register-orgs-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
  })

  const { name, address, phone } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrgsUseCase()

    await registerUseCase.execute({
      name,
      address,
      phone,
    })
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }

  return reply.status(201).send()
}
