import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQueryParams = z.object({
    city: z.string(),
  })

  const searchPetsQuerySchema = z.object({
    q: z.record(z.string()),
    page: z.coerce.number().min(1).default(1),
  })

  const { city } = searchPetsQueryParams.parse(request.params)
  const { q, page } = searchPetsQuerySchema.parse(request.query)

  try {
    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
      query: q,
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
