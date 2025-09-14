import { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { CreateRole } from '../../application/role/CreateRole';
import { GetAllRoles } from '../../application/role/GetAllRoles';
import { UpdateRole } from '../../application/role/UpdateRole';
import { DeleteRole } from '../../application/role/DeleteRole';
import { Role } from '../../domain/entities/Role';

@injectable()
export class RoleController {
    constructor(
        @inject('CreateRole') private createRole: CreateRole,
        @inject('GetAllRoles') private getAllRoles: GetAllRoles,
        @inject('UpdateRole') private updateRole: UpdateRole,
        @inject('DeleteRole') private deleteRole: DeleteRole
    ) {}

async create(
    request: FastifyRequest<{ Body: { nombre: string; descripcion?: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { nombre, descripcion } = request.body;
      const role = await this.createRole.execute({ nombre, descripcion });
      reply.code(201).send({ success: true, data: role });
    } catch (error) {
      reply.code(500).send({ success: false, message: "Error creating role", error });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const roles = await this.getAllRoles.execute();
      reply.send({ success: true, data: roles });
    } catch (error) {
      reply.code(500).send({ success: false, message: "Error fetching roles", error });
    }
  }

  async update(
    request: FastifyRequest<{ Body: Role }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const role = request.body;
      const updatedRole = await this.updateRole.execute(role);
      reply.send({ success: true, data: updatedRole });
    } catch (error) {
      reply.code(500).send({ success: false, message: "Error updating role", error });
    }
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { id } = request.params;
      await this.deleteRole.execute(id);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({ success: false, message: "Error deleting role", error });
    }
  }
}