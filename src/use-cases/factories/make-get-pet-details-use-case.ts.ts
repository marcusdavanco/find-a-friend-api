import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetsUseCase } from '@/use-cases/pets/get-pet-details'

export function makeGetPetsDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetsUseCase(petsRepository)

  return useCase
}
