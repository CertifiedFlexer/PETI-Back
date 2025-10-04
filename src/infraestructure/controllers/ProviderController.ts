import { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { CreateProvider } from '../../application/provider/CreateProvider';

@injectable()
export class ProviderController {
  constructor(@inject("CreateProvider") private createProvider: CreateProvider) {}

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
}