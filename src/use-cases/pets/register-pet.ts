import { PetsRepository } from '@/repositories/pet-repository'
import { Independency, Species, Age, Size } from '@prisma/client'

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
  private speciesMap = new Map<string, Species>()
  private ageMap = new Map<string, Age>()
  private sizeMap = new Map<string, Size>()
  private independencyMap = new Map<string, Independency>()

  constructor(private petsRepository: PetsRepository) {
    this.initializeMaps()
  }

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
    const speciesValue = this.speciesMap.get(species)
    const ageValue = this.ageMap.get(age)
    const sizeValue = this.sizeMap.get(size)
    const independencyValue = this.independencyMap.get(independency)

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

  private initializeMaps() {
    const speciesValues: [string, Species][] = [
      ['dog', Species.DOG],
      ['cat', Species.CAT],
    ]

    const ageValues: [string, Age][] = [
      ['filhote', Age.FILHOTE],
      ['jovem', Age.JOVEM],
      ['adulto', Age.ADULTO],
      ['idoso', Age.IDOSO],
    ]

    const sizeValues: [string, Size][] = [
      ['pequenino', Size.PEQUENINO],
      ['pequeno', Size.PEQUENO],
      ['medio', Size.MEDIO],
      ['grande', Size.GRANDE],
      ['gigante', Size.GIGANTE],
    ]

    const independencyValues: [string, Independency][] = [
      ['baixo', Independency.BAIXO],
      ['baixo', Independency.MEDIO],
      ['baixo', Independency.ALTO],
    ]

    this.populateMap(this.speciesMap, speciesValues)
    this.populateMap(this.ageMap, ageValues)
    this.populateMap(this.sizeMap, sizeValues)
    this.populateMap(this.independencyMap, independencyValues)
  }

  private populateMap<T>(map: Map<string, T>, values: [string, T][]) {
    for (const [key, value] of values) {
      map.set(key, value)
    }
  }
}
