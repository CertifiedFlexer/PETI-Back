import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class DeleteProvider {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}

  async execute(id: string): Promise<void> {
    await this.providerRepository.delete(id);
  }
}