import { PetsRepository, QueryParams } from '@/repositories/pet-repository'

interface SearchPetsUseCaseRequest {
  query: QueryParams
  city: string
  page: number
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ query, city, page }: SearchPetsUseCaseRequest) {
    const pets = await this.petsRepository.searchMany(query, city, page)

    return {
      pets,
    }
  }
}
