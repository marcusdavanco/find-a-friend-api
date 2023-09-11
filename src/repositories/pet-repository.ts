import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  list(): Promise<Pet[]>
  listByCity(city: string): Promise<Pet[]>
}
