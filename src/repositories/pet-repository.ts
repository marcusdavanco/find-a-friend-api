import { Prisma, Pet } from '@prisma/client'

export type QueryParams = {
  [key: string]: string
}
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  list(city: string, page: number): Promise<Pet[]>
  searchMany(query: QueryParams, page: number): Promise<Pet[]>
}
