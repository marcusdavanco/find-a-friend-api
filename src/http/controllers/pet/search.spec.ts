import { app } from '@/app'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by its details', async () => {
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

    await request(app.server).post('/pets').set('Cookie', cookies).send({
      name: 'Sofia',
      age: 'filhote',
      size: 'pequeno',
      independency: 'baixo',
      species: 'cat',
      city: 'carapicuiba',
      description: 'white and tabby',
      orgId: 'find-a-friend-org',
    })

    await request(app.server).post('/pets').set('Cookie', cookies).send({
      name: 'Fred',
      age: 'filhote',
      size: 'pequeno',
      independency: 'baixo',
      species: 'dog',
      city: 'carapicuiba',
      description: 'white and tabby',
      orgId: 'find-a-friend-org',
    })

    const response = await request(app.server)
      .get('/pets/city/carapicuiba/search?q={"species":"dog"}')
      .send()

    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: 'Fred' }),
    ])
  })
})
