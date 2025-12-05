import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class UpdateSubscription {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}
    async execute(providerId: string): Promise<Provider> {
        const provider = await this.providerRepository.updateSubscription(providerId);
        return provider;
    }
}
