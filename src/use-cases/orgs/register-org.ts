import { OrgsRepository } from '@/repositories/org-repository'

interface RegisterOrgUseCaseRequest {
  name: string
  address: string
  phone: string
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ name, address, phone }: RegisterOrgUseCaseRequest) {
    const org = await this.orgsRepository.create({
      name,
      address,
      phone,
    })

    return {
      org,
    }
  }
}
