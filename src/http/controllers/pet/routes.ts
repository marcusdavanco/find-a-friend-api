import { FastifyInstance } from 'fastify'
import { search } from './search'
import { details } from './details'
import { fetch } from './fetch'
import { register } from './register'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/city/:city', fetch)
  app.get('/pets/:pet', details)
  app.get('/pets/search', search)
}
