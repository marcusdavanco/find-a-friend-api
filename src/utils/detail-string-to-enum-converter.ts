import { Age, Independency, Size, Species } from '@prisma/client'

export class DetailStringToEnumConverter {
  public readonly speciesMap = new Map<string, Species>()
  public readonly ageMap = new Map<string, Age>()
  public readonly sizeMap = new Map<string, Size>()
  public readonly independencyMap = new Map<string, Independency>()

  constructor() {
    this.initializeMaps()
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
