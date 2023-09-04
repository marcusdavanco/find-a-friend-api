import { PrismaPetsRepository } from '@/repositories/prisma-pet-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: number
  breed: string
  description?: string
  city: string
  organizationId?: string
}

export async function registerPetUseCase({
  name,
  age,
  breed,
  description,
  city,
  organizationId,
}: RegisterPetUseCaseRequest) {
  const PrismaPetRepository = new PrismaPetsRepository()

  await PrismaPetRepository.create({
    name,
    age,
    breed,
    description,
    city,
    organizationId,
  })
}
