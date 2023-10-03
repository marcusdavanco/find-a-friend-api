import { FastifyInstance } from 'fastify'
import { search } from './search'
import { details } from './details'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/:city', fetch)
  app.get('/pets/:pet', details)
  app.get('/pets/search', search)
}
