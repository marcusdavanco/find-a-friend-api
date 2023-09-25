import { PetsRepository } from '@/repositories/pet-repository'

interface FetchPetsUseCaseRequest {
  city: string
  page: number
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city, page }: FetchPetsUseCaseRequest) {
    const pets = await this.petsRepository.list(city, page)

    return {
      pets,
    }
  }
}
