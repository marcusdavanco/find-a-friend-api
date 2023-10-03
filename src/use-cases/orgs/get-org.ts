import { OrgsRepository } from '@/repositories/org-repository'

interface GetOrgsUseCaseRequest {
  id: string
}

export class GetOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ id }: GetOrgsUseCaseRequest) {
    const org = await this.orgsRepository.findById(id)

    return {
      org,
    }
  }
}
