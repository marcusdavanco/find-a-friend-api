import { prisma } from '@/lib/prisma'
import { Age, Independency, Prisma, Size, Species } from '@prisma/client'
import { PetsRepository, QueryParams } from '../pet-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findFirstOrThrow({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async list(city: string, page: number) {
    const pageSize = 20

    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    })

    return pets
  }

  async searchMany(query: QueryParams, city: string, page: number) {
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
        AND: {
          city,
        },
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    })

    return pets
  }
}
