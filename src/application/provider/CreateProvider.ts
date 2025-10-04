import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class CreateProvider {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}

  async execute(data: Partial<Provider>): Promise<Provider> {
    const provider = await this.providerRepository.create(data);
    return provider;
  }
}
