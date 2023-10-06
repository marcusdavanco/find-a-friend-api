import { beforeEach, describe, it, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory.ts/in-memory-org-repository'
import { GetOrgsUseCase } from './get-org'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgsUseCase

describe('Get Orgs Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgsUseCase(orgsRepository)
  })

  it('should be able to get an org by id', async () => {
    const newOrg = await orgsRepository.create({
      name: 'Legatum',
      address: 'Rua Ali Perto, 123',
      phone: '(11) 99999-9999',
      email: 'letagum@email.com',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({ id: newOrg.id })

    expect(org).toHaveProperty('name', 'Legatum')
  })
})
