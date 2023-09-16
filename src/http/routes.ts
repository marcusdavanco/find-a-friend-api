import { FastifyInstance } from 'fastify'
import { register } from './controllers/pet/register'
import { fetch } from './controllers/pet/fetch'

export async function appRoutes(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/:city', fetch)
}
