import { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { CreateProvider } from '../../application/provider/CreateProvider';
import { UpdateProvider } from '../../application/provider/UpdateProvider';
import { DeleteProvider } from '../../application/provider/DeleteProvider';
import { ProviderImageService } from '../../application/provider/ProviderImage.service';
import { UpdateSubscription } from '../../application/provider/updateSubscription';

@injectable()
export class ProviderController {
  constructor(@inject("CreateProvider") private createProvider: CreateProvider,
    @inject("UpdateProvider") private updateProvider: UpdateProvider,
    @inject("DeleteProvider") private deleteProvider: DeleteProvider,
    @inject("GetAllProviders") private getAllProviders: any,
    @inject("GetProviderByUser") private getByUserProvider: any,
    @inject("GetProvider") private getByIdProvider: any,
    @inject("GetProvidersByService") private getByServiceProvider: any,
    @inject("ProviderImageService") private providerImageService: ProviderImageService,
    @inject("UpdateSubscription") private updateProviderSubscription: UpdateSubscription
  ) { }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const providerData = req.body;
    try {
      const newProvider = await this.createProvider.execute(providerData as any);
      reply.status(201).send(newProvider);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async update(req: FastifyRequest, reply: FastifyReply) {
    const providerData = req.body;
    try {
      const updatedProvider = await this.updateProvider.execute(providerData as any);
      reply.send(updatedProvider);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      await this.deleteProvider.execute(id);
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const providers = await this.getAllProviders.execute();
      reply.send(providers);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    try {
      const provider = await this.getByIdProvider.execute(id);
      reply.send(provider);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async getByUser(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.params as any;
    console.log(userId)
    try {
      const providers = await this.getByUserProvider.execute(userId.id_usuario);
      reply.send(providers);
    }
    catch (error) {
      reply.status(500).send(error);
    }
  }
  async getProvidersByService(req: FastifyRequest, reply: FastifyReply) {
    const { tipo_servicio } = req.params as any;
    try {
      const providers = await this.getByServiceProvider.execute(tipo_servicio);
      reply.send(providers);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  async uploadProviderImage(req: FastifyRequest, reply: FastifyReply) {
    const providerId = req.params as any;
    try {
      const file = await req.file();

      if (!file) {
        return reply.status(400).send({ message: "No file uploaded" });
      }

      const buffer = await file.toBuffer();

      const base64Image = `data:${file.mimetype};base64,${buffer.toString("base64")}`;

      const provider = await this.providerImageService.uploadImage(
        providerId.id,
        base64Image
      );

      reply.send(provider);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: error.message });
    }
  }

  async updateProviderImage(req: FastifyRequest, reply: FastifyReply) {
    const { providerId } = req.params as any;

    try {
      const file = await req.file();

      if (!file) {
        return reply.status(400).send({ message: "No file uploaded" });
      }

      const buffer = await file.toBuffer();
      const base64Image = `data:${file.mimetype};base64,${buffer.toString("base64")}`;

      const provider = await this.providerImageService.updateImage(
        providerId,
        base64Image
      );

      reply.send(provider);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error });
    }
  }

  async deleteProviderImage(req: FastifyRequest, reply: FastifyReply) {
    const { providerId } = req.params as any;

    try {
      const provider = await this.providerImageService.deleteImage(providerId);
      reply.send(provider);
    } catch (error) {
      reply.status(500).send({ error });
    }
  }
  async updateSubscription(req: FastifyRequest, reply: FastifyReply) {
    const { providerId } = req.params as any;
    try {
      const provider = await this.updateProviderSubscription.execute(providerId);
      reply.send(provider);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
}