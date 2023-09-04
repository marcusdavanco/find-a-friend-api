import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()
const prisma = new PrismaClient()

const createPet = async () => {
  try {
    const createdPet = await prisma.pet.create({
      data: {
        age: 1,
        breed: 'siamese',
        city: 'sao paulo',
        name: 'mel',
      },
    })
    console.log('Created pet:', createdPet)
  } catch (error) {
    console.error('Error creating pet:', error)
  } finally {
    await prisma.$disconnect() // Disconnect from the Prisma Client when done
  }
}

createPet()
