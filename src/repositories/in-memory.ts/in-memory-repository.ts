import { Prisma, Pet } from '@prisma/client'
import { PetsRepository, QueryParams } from '../pet-repository'
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

  async list(city: string, page: number) {
    const pageSize = 20

    return new Promise<Pet[]>((resolve) => {
      resolve(
        this.pets
          .filter((pet) => pet.city === city)
          .slice((page - 1) * pageSize, page * pageSize),
      )
    })
  }

  async searchMany(query: QueryParams, page: number) {
    const pageSize = 20
    const { size, age, species, independency } = query

    const filteredPets = this.pets.filter((pet) => {
      return (
        (!size || pet.size === size) &&
        (!age || pet.age === age) &&
        (!species || pet.species === species) &&
        (!independency || pet.independency === independency)
      )
    })

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedPets = filteredPets.slice(startIndex, endIndex)

    return paginatedPets
  }
}
