import { InMemoryPetsRepository } from '@/repositories/in-memory.ts/in-memory-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
  })

  it('should be able to fetch a list of pets by city', async () => {
    await petsRepository.create({
      name: 'Sofia',
      species: 'CAT',
      size: 'PEQUENO',
      age: 'FILHOTE',
      independency: 'BAIXO',
      city: 'carapicuiba',
      description: 'white and tabby.',
      orgId: 'find-a-friend-org',
    })

    await petsRepository.create({
      name: 'Samuel',
      species: 'CAT',
      size: 'PEQUENO',
      age: 'FILHOTE',
      independency: 'BAIXO',
      city: 'carapicuiba',
      description: 'white and tabby.',
      orgId: 'find-a-friend-org',
    })

    await petsRepository.create({
      name: 'Pepe',
      species: 'CAT',
      size: 'PEQUENO',
      age: 'FILHOTE',
      independency: 'BAIXO',
      city: 'sao paulo',
      description: 'siamese.',
      orgId: 'find-a-friend-org',
    })

    const { pets } = await sut.execute({ city: 'carapicuiba', page: 1 })

    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch paginated pets', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        species: 'CAT',
        size: 'PEQUENO',
        age: 'FILHOTE',
        independency: 'BAIXO',
        city: 'carapicuiba',
        description: `pet number ${i}`,
        orgId: 'find-a-friend-org',
      })
    }

    const { pets } = await sut.execute({
      city: 'carapicuiba',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: `pet-21` }),
      expect.objectContaining({ name: `pet-22` }),
    ])
  })
})
