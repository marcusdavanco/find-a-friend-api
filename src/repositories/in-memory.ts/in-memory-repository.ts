import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pet-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return new Promise((resolve) => {
      const pet = {
        id: randomUUID(),
        name: data.name,
        age: data.age,
        breed: data.breed,
        description: data.description ?? null,
        city: data.city,
        organizationId: data.organizationId ?? null,
      }

      this.pets.push(pet)

      resolve(pet)
    })
  }

  list(city: string) {
    return new Promise<Pet[]>((resolve) => {
      resolve(this.pets.filter((pet) => pet.city === city))
    })
  }
}
