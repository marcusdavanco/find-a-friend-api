import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, QueryParams } from '../pet-repository'
import { DetailStringToEnumConverter } from '@/utils/detail-string-to-enum-converter'

export class PrismaPetsRepository implements PetsRepository {
  private converter = new DetailStringToEnumConverter()

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

    const sizeValue = this.converter.sizeMap.get(size)
    const ageValue = this.converter.ageMap.get(age)
    const speciesValue = this.converter.speciesMap.get(species)
    const independencyValue = this.converter.independencyMap.get(independency)

    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          { size: sizeValue },
          { age: ageValue },
          { species: speciesValue },
          {
            independency: independencyValue,
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
