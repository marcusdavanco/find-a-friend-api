import { PetsRepository } from '@/repositories/pet-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: number
  breed: string
  description?: string
  city: string
  organizationId?: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    breed,
    description,
    city,
    organizationId,
  }: RegisterPetUseCaseRequest) {
    const pet = await this.petsRepository.create({
      name,
      age,
      breed,
      description,
      city,
      organizationId,
    })

    return {
      pet,
    }
  }
}
