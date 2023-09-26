import { PetsRepository } from '@/repositories/pet-repository'

interface GetPetsUseCaseRequest {
  id: string
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetsUseCaseRequest) {
    const pet = await this.petsRepository.findById(id)

    return {
      pet,
    }
  }
}
