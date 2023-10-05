import { InMemoryOrgsRepository } from '@/repositories/in-memory.ts/in-memory-org-repository'
import { beforeEach, describe, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it.skip('should be able to authenticate', () => {
    // TODO
  })

  it.skip('should not be able to authenticate with wrong email', () => {
    // TODO
  })

  it.skip('should not be able to authenticate with wrong password', () => {
    // TODO
  })
})
