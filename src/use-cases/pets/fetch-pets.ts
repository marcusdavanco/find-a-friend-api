import { PetsRepository } from '@/repositories/pet-repository'

interface FetchPetsUseCaseRequest {
  city: string
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: FetchPetsUseCaseRequest) {
    const pets = await this.petsRepository.list(city)

    return {
      pets,
    }
  }
}
