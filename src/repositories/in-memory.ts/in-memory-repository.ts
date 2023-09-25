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
        species: data.species,
        size: data.size,
        age: data.age,
        independency: data.independency,
        description: data.description ?? null,
        city: data.city,
        organizationId: data.organizationId ?? null,
        available: data.available || true,
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

  async searchMany(query: QueryParams, city: string, page: number) {
    const pageSize = 20
    const { size, age, species, independency } = query

    const pets = this.pets.filter((pet) => {
      return (
        pet.city === city &&
        (size === undefined || pet.size === size) &&
        (age === undefined || pet.age === age) &&
        (species === undefined || pet.species === species) &&
        (independency === undefined || pet.independency === independency)
      )
    })

    const paginatedPets = pets.slice((page - 1) * pageSize, page * pageSize)

    return paginatedPets
  }
}
