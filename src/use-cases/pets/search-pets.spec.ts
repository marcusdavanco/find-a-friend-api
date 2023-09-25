import { InMemoryPetsRepository } from '@/repositories/in-memory.ts/in-memory-repository'
import { SearchPetsUseCase } from './search-pets'
import { beforeEach, describe, expect, it } from 'vitest'
import { Age, Independency, Size, Species } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search pet UseCase', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search by pet characteristics.', async () => {
    await petsRepository.create({
      name: 'munchkin',
      species: Species.CAT,
      size: Size.PEQUENO,
      age: Age.FILHOTE,
      independency: Independency.BAIXO,
      city: 'carapicuiba',
      description: 'white and tabby.',
    })

    await petsRepository.create({
      name: 'maine coon',
      species: Species.CAT,
      size: Size.GRANDE,
      age: Age.JOVEM,
      independency: Independency.BAIXO,
      city: 'carapicuiba',
      description: 'gray.',
    })

    const { pets } = await sut.execute({
      query: { size: 'PEQUENO' },
      city: 'carapicuiba',
      page: 1,
    })

    expect(pets).toEqual([expect.objectContaining({ name: `munchkin` })])
  })

  it('should be able to view paginated results when searching by characteristics.', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `small-cat-${i}`,
        species: Species.CAT,
        size: Size.PEQUENO,
        age: Age.FILHOTE,
        independency: Independency.BAIXO,
        city: 'carapicuiba',
        description: 'white and tabby.',
      })
    }

    await petsRepository.create({
      name: 'maine coon',
      species: Species.CAT,
      size: Size.GRANDE,
      age: Age.JOVEM,
      independency: Independency.BAIXO,
      city: 'carapicuiba',
      description: 'gray.',
    })

    const { pets } = await sut.execute({
      query: { size: 'PEQUENO' },
      city: 'carapicuiba',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: `small-cat-21` }),
      expect.objectContaining({ name: `small-cat-22` }),
    ])
  })
})
