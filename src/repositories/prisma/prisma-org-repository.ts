import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../org-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findFirstOrThrow({
      where: {
        id,
      },
    })

    return org
  }
}
