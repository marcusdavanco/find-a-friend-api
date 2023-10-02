import { makeGetPetsDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case.ts'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const fetchParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = fetchParamsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = makeGetPetsDetailsUseCase()

    const { pet } = await getPetDetailsUseCase.execute({
      id,
    })

    return reply.status(201).send({
      pet,
    })
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
  }

  return reply.status(201).send()
}
