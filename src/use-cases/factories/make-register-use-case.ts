import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '@/use-cases/pets/register-pet'

export function makeRegisterUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetUseCase(petsRepository)

  return useCase
}
