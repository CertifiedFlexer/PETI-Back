import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetAllProviders {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}

  async execute(): Promise<Provider[] | null> {
    return await this.providerRepository.findAll();
  }
}