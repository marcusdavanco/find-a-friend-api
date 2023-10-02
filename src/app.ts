import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { parse } from 'node:querystring'

export const app = fastify({
  querystringParser: (str) => parse(str.toLowerCase()),
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issue: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
