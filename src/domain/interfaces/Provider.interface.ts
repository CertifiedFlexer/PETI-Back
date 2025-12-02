import { Provider } from "../entities/Provider";

export interface IProviderRepository {
  create(proveedor: Partial<Provider>): Promise<Provider>;
  findById(id: string): Promise<Provider | null>;
  findAll(): Promise<Provider[] | null>;
  findByUserId(userId: string): Promise<Provider[]>;
  update(proveedor: Provider): Promise<Provider>;
  delete(id: string): Promise<void>;
  getByService(serviceType: string): Promise<Provider[]>;
  uploadImage(providerId: string, imageUrl: string): Promise<Provider>;
  updateImage(providerId: string, imageUrl: string): Promise<Provider>;
  deleteImage(providerId: string): Promise<Provider>;
}
