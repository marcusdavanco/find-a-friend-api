import { app } from '@/app'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Legatum',
      address: 'Rua Ali Perto, 123',
      phone: '(11) 9999-9999',
      email: 'legatum@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
