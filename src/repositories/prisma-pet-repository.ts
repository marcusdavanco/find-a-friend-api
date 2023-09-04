import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
