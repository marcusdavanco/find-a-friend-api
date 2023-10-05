import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthenticateUseCase } from '../orgs/authenticate'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(orgsRepository)

  return useCase
}
