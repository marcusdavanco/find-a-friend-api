import { InMemoryPetsRepository } from '@/repositories/in-memory.ts/in-memory-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'

let petsRepository: InMemoryPetsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterUseCase(petsRepository)
  })

  it('should be able to register', async () => {
    const { pet } = await sut.execute({
      name: 'Rocco',
      age: 1,
      breed: 'srd',
      city: 'carapicuiba',
      description: 'black with a white spot.',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
