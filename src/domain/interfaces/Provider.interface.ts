import { Provider } from "../entities/Provider";

export interface IProviderRepository {
  create(proveedor: Partial<Provider>): Promise<Provider>;
  findById(id: string): Promise<Provider | null>;
  findAll(): Promise<Provider[] | null>;
  update(proveedor: Provider): Promise<Provider>;
  delete(id: string): Promise<void>;
}
