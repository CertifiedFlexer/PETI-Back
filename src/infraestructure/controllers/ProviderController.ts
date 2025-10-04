import { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { CreateProvider } from '../../application/provider/CreateProvider';
import { UpdateProvider } from '../../application/provider/UpdateProvider';
import { DeleteProvider } from '../../application/provider/DeleteProvider';

@injectable()
export class ProviderController {
  constructor(@inject("CreateProvider") private createProvider: CreateProvider,
    @inject("UpdateProvider") private updateProvider: UpdateProvider,
    @inject("DeleteProvider") private deleteProvider: DeleteProvider,
    @inject("GetAllProviders") private getAllProviders: any,
    @inject("GetProviderByUser") private getByUserProvider: any,
    @inject("GetProvider") private getByIdProvider: any

  ) { }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const providerData = req.body;
    const mappedProviderData = {
      nombre: providerData['nombre'],
      contacto: providerData['contacto'],
      direccion: providerData['direccion'] || null,
      ciudad: providerData['ciudad'] || null,
      pais: providerData['pais'] || null,
      activo: providerData['activo'],
      id_usuario: providerData['id_usuario']
    };
    try {
      const newProvider = await this.createProvider.execute(mappedProviderData);
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
    const { userId } = req.params as any;
    try {
      const providers = await this.getByUserProvider.execute(userId);
      reply.send(providers);
    }
    catch (error) {
      reply.status(500).send(error);
    }
  }
}