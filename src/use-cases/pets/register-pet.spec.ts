import { InMemoryPetsRepository } from '@/repositories/in-memory.ts/in-memory-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Rocco',
      age: 'filhote',
      size: 'pequeno',
      independency: 'baixo',
      species: 'dog',
      city: 'carapicuiba',
      description: 'black with a white spot.',
      orgId: 'find-a-friend-org',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
