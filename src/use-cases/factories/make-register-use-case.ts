import { PrismaPetsRepository } from '@/repositories/prisma-pet-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterUseCase(petsRepository)

  return useCase
}
