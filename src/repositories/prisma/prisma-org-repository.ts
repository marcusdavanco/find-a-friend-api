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
    return await prisma.org.findFirstOrThrow({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.org.findFirstOrThrow({
      where: {
        email,
      },
    })
  }
}
