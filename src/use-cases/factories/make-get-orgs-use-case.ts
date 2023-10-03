import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { GetOrgsUseCase } from '../orgs/get-org'

export function makeGetOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetOrgsUseCase(orgsRepository)

  return useCase
}
