import { FastifyInstance } from 'fastify'
import { search } from './search'
import { details } from './details'
import { fetch } from './fetch'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets/city/:city', fetch)
  app.get('/pets/:id', details)
  app.get('/pets/city/:city/search', search)

  app.post('/pets', { onRequest: [verifyJWT] }, register)
}
