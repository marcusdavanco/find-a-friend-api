import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchParamsSchema = z.object({
    city: z.string(),
  })

  const fetchQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { city } = fetchParamsSchema.parse(request.params)
  const { page } = fetchQuerySchema.parse(request.query)

  try {
    const fetchUseCase = makeFetchPetsUseCase()

    const { pets } = await fetchUseCase.execute({
      city,
      page,
    })

    return reply.status(201).send({
      pets,
    })
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }

  return reply.status(201).send()
}
