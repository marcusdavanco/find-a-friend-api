import { makeFetchUseCase } from '@/use-cases/factories/make-fetch-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchParamsSchema = z.object({
    city: z.string(),
  })

  const { city } = fetchParamsSchema.parse(request.params)

  try {
    const fetchUseCase = makeFetchUseCase()

    const { pets } = await fetchUseCase.execute({
      city,
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
