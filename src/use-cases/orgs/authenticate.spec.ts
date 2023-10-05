import { InMemoryOrgsRepository } from '@/repositories/in-memory.ts/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Legatum',
      address: 'Rua Ali Perto, 123',
      phone: '(11) 99999-9999',
      email: 'legatum@email.com',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'legatum@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it.skip('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      name: 'Legatum',
      address: 'Rua Ali Perto, 123',
      phone: '(11) 99999-9999',
      email: 'legatum@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'another-email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it.skip('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Legatum',
      address: 'Rua Ali Perto, 123',
      phone: '(11) 99999-9999',
      email: 'legatum@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'legatum@email.com',
        password: 'another-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
