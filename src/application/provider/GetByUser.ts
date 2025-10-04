import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetProviderByUser {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}

  async execute(userId: string): Promise<Provider[]> {
    return this.providerRepository.findByUserId(userId);
  }
}
