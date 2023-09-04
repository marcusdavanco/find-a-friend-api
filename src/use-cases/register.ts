import { PetsRepository } from '@/repositories/pet-repository'
import { PrismaPetsRepository } from '@/repositories/prisma-pet-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: number
  breed: string
  description?: string
  city: string
  organizationId?: string
}

export class RegisterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    breed,
    description,
    city,
    organizationId,
  }: RegisterPetUseCaseRequest) {
    const petsRepository = new PrismaPetsRepository()

    await petsRepository.create({
      name,
      age,
      breed,
      description,
      city,
      organizationId,
    })
  }
}
