import { Prisma, Pet } from '@prisma/client'

export type QueryParams = {
  [key: string]: string
}
export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  list(city: string, page: number): Promise<Pet[]>
  searchMany(query: QueryParams, city: string, page: number): Promise<Pet[]>
}
