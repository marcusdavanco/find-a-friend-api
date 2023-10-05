import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../org-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create({
    name,
    address,
    phone,
    email,
    password_hash,
  }: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    return new Promise((resolve) => {
      const org = {
        id: randomUUID(),
        name,
        address,
        phone,
        email,
        password_hash,
      }

      this.orgs.push(org)

      resolve(org)
    })
  }

  async findById(id: string): Promise<Org | null> {
    return new Promise((resolve) => {
      const index = this.orgs.findIndex((org) => org.id === id)

      if (index === -1) {
        resolve(null)
      }

      resolve(this.orgs[index])
    })
  }

  async findByEmail(email: string): Promise<Org | null> {
    return new Promise((resolve) => {
      const index = this.orgs.findIndex((org) => org.email === email)

      if (index === -1) {
        resolve(null)
      }

      resolve(this.orgs[index])
    })
  }
}
