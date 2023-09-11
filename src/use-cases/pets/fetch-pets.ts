import { PetsRepository } from '@/repositories/pet-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}
}
