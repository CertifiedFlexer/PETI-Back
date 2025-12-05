import { Provider } from "../../domain/entities/Provider";
import { IProviderRepository } from "../../domain/interfaces/Provider.interface";
import { v2 as cloudinary } from "cloudinary";
import { injectable, inject } from "tsyringe";

@injectable()
export class ProviderImageService {
  constructor(@inject("ProviderRepository") private providerRepository: IProviderRepository) {}
    async uploadImage(providerId: string, imagePath: string): Promise<Provider> {
        console.log("Updating image for provider ID:", providerId);
        const provider = await this.providerRepository.findById(providerId);
        if (!provider) {
            throw new Error("Provider not found");
        }
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "providers",
            public_id: `provider_${providerId}`,
            overwrite: true,
        });
        return this.providerRepository.uploadImage(providerId, result.secure_url);
    }
    async updateImage(providerId: string, imagePath: string): Promise<Provider> {
        const provider = await this.providerRepository.findById(providerId);
        if (!provider) {
            throw new Error("Provider not found");
        }
        if (provider.imagenPublicId) {
            await cloudinary.uploader.destroy(provider.imagenPublicId);
        }
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "providers",
            public_id: `provider_${providerId}`,
            overwrite: true,
        });
        return this.providerRepository.updateImage(providerId, result.secure_url);
    }
    async deleteImage(providerId: string): Promise<Provider> {
        const provider = await this.providerRepository.findById(providerId);
        if (!provider) {
            throw new Error("Provider not found");
        }
        if (provider.imagenPublicId) {
            await cloudinary.uploader.destroy(provider.imagenPublicId);
        }
        return this.providerRepository.deleteImage(providerId);
    }
}