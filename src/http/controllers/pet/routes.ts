import { FastifyInstance } from 'fastify'
import { register } from './controllers/pet/register'
import { fetch } from './controllers/pet/fetch'
import { details } from './controllers/pet/details'
import { search } from './controllers/pet/search'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/:city', fetch)
  app.get('/pets/:pet', details)
  app.get('/pets/search', search)
}
