import { InMemoryPetsRepository } from '@/repositories/in-memory.ts/in-memory-repository'
import { beforeEach, describe, it, expect } from 'vitest'
import { GetPetsUseCase } from './get-pet-details'
import { Age, Independency, Size, Species } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(petsRepository)
  })

  it('should be able to get a pet details', async () => {
    const newPet = await petsRepository.create({
      name: 'Nova',
      species: Species.CAT,
      size: Size.PEQUENO,
      age: Age.FILHOTE,
      independency: Independency.BAIXO,
      city: 'carapicuiba',
      description: 'black.',
    })

    const { pet } = await sut.execute({ id: newPet.id })

    expect(pet).toHaveProperty('name', 'Nova')
  })
})
