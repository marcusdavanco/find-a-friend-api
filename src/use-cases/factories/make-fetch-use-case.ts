import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetsUseCase } from '@/use-cases/pets/fetch-pets'

export function makeFetchUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(petsRepository)

  return useCase
}
