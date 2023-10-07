import { app } from '@/app'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Legatum',
      address: 'Rua Ali Perto, 123',
      phone: '(11) 9999-9999',
      email: 'legatum@email.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'legatum@email.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .post('/pets')
      .set('Cookie', cookies)
      .send({
        name: 'Rocco',
        age: 'filhote',
        size: 'pequeno',
        independency: 'baixo',
        species: 'dog',
        city: 'carapicuíba',
        description: 'black with a white spot',
        orgId: 'find-a-friend-org',
      })

    expect(response.statusCode).toEqual(201)
  })
})
