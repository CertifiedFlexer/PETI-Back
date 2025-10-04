import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetProvider {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}

  async execute(id: string): Promise<Provider | null> {
    const provider = await this.providerRepository.findById(id);
    return provider;
  }
}