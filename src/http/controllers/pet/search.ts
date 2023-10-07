import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQueryParams = z.object({
    city: z.string(),
  })

  const searchPetsQuerySchema = z.object({
    q: z.string(), // Change this to expect a JSON string
    page: z.coerce.number().min(1).default(1),
  })

  const { city } = searchPetsQueryParams.parse(request.params)

  // Parse the JSON string into an object
  const { q, page } = searchPetsQuerySchema.parse(request.query)
  const query = JSON.parse(q || '{}') // Parse q as a JSON string

  try {
    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
      query,
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
