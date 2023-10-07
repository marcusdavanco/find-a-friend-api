import { OrgsRepository } from '@/repositories/org-repository'
import { hash } from 'bcryptjs'
import { OrgsAlreadyExistsError } from '../errors/orgs-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  address: string
  phone: string
  email: string
  password: string
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    address,
    phone,
    email,
    password,
  }: RegisterOrgUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgsAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      address,
      phone,
      email,
      password_hash,
    })

    return {
      org,
    }
  }
}
