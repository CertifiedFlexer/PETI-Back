import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class UpdateProvider {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}

  async execute(data: Provider): Promise<Provider> {
    const provider = await this.providerRepository.update(data);
    return provider;
  }
}