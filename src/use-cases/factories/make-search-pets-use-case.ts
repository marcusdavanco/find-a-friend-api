import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsUseCase } from '@/use-cases/pets/search-pets'

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(petsRepository)

  return useCase
}
