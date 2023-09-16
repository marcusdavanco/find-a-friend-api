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
      age: 1,
      breed: 'srd',
      city: 'carapicuiba',
      description: 'white and tabby.',
    })

    await petsRepository.create({
      name: 'Samuel',
      age: 1,
      breed: 'srd',
      city: 'carapicuiba',
      description: 'white and tabby.',
    })

    await petsRepository.create({
      name: 'Pepe',
      age: 1,
      breed: 'srd',
      city: 'sao paulo',
      description: 'siamese.',
    })

    const { pets } = await sut.execute({ city: 'carapicuiba' })

    expect(pets).toHaveLength(2)
  })
})
