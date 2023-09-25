import { prisma } from '@/lib/prisma'
import { Age, Independency, Prisma, Size, Species } from '@prisma/client'
import { PetsRepository, QueryParams } from '../pet-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async list(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pets
  }

  async searchMany(query: QueryParams, page: number) {
    const pageSize = 20

    const { size, age, species, independency } = query

    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          { size: Size[size as keyof typeof Size] },
          { age: Age[age as keyof typeof Age] },
          { species: Species[species as keyof typeof Species] },
          {
            independency:
              Independency[independency as keyof typeof Independency],
          },
        ],
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    })

    return pets
  }
}
