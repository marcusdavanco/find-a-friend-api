import { FastifyInstance } from 'fastify'
import { find } from './find'
import { register } from './register'

export async function petRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.get('/orgs/:org', find)
}
