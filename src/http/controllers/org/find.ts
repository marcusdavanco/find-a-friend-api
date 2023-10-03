import { makeGetOrgsUseCase } from '@/use-cases/factories/make-get-orgs-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const fetchParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = fetchParamsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = makeGetOrgsUseCase()

    const { org } = await getPetDetailsUseCase.execute({
      id,
    })

    return reply.status(201).send({
      org,
    })
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }

  return reply.status(201).send()
}
