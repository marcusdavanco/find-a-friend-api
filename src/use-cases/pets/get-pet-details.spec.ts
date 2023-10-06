import { InMemoryPetsRepository } from '@/repositories/in-memory.ts/in-memory-repository'
import { beforeEach, describe, it, expect } from 'vitest'
import { GetPetsUseCase } from './get-pet-details'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(petsRepository)
  })

  it('should be able to get a pet details', async () => {
    const newPet = await petsRepository.create({
      name: 'Rocco',
      age: 'FILHOTE',
      size: 'PEQUENO',
      independency: 'BAIXO',
      species: 'DOG',
      city: 'carapicuiba',
      description: 'black with a white spot.',
      orgId: 'find-a-friend-org',
    })

    const { pet } = await sut.execute({ id: newPet.id })

    expect(pet).toHaveProperty('name', 'Rocco')
  })
})
