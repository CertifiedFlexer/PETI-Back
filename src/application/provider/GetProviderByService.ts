import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetProvidersByService {
  constructor(
    @inject("ProviderRepository") private providerRepository: IProviderRepository
  ) {}

  async execute(serviceType: string): Promise<Provider[]> {
    return this.providerRepository.getByService(serviceType);
  }
}
