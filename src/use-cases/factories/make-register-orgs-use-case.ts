import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { RegisterOrgUseCase } from '../orgs/register-org'

export function makeRegisterOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterOrgUseCase(orgsRepository)

  return useCase
}
