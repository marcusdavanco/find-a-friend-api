import { PetsRepository } from '@/repositories/pet-repository'
import { DetailStringToEnumConverter } from './converters/detail-string-to-enum-converter'

interface RegisterPetUseCaseRequest {
  species: string
  name: string
  age: string
  size: string
  independency: string
  description?: string
  city: string
  orgId: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  private converter = new DetailStringToEnumConverter()

  async execute({
    species,
    name,
    age,
    size,
    independency,
    description,
    city,
    orgId,
  }: RegisterPetUseCaseRequest) {
    const speciesValue = this.converter.speciesMap.get(species)
    const ageValue = this.converter.ageMap.get(age)
    const sizeValue = this.converter.sizeMap.get(size)
    const independencyValue = this.converter.independencyMap.get(independency)

    if (!speciesValue || !ageValue || !sizeValue || !independencyValue) {
      throw new Error('Invalid input values.')
    }

    const pet = await this.petsRepository.create({
      species: speciesValue,
      name,
      age: ageValue,
      size: sizeValue,
      independency: independencyValue,
      description,
      city,
      orgId,
    })

    return {
      pet,
    }
  }
}
