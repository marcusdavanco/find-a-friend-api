import { app } from '@/app'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Fetch Pets Details(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
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

    const fetchResponse = await request(app.server)
      .get('/pets/city/carapicuiba')
      .send()

    const { id } = fetchResponse.body.pets[0]

    const response = await request(app.server).get(`/pets/${id}`).send()

    expect(response.body.pet).toContain({ name: 'Sofia' })
  })
})
