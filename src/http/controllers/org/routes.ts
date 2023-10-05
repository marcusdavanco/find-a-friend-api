import { FastifyInstance } from 'fastify'
import { find } from './find'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.get('/orgs/:org', find)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
}
