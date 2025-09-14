import {IRoleRepository} from '../../domain/interfaces/Role.interface';
import {injectable, inject} from 'tsyringe';

@injectable()
export class DeleteRole {
    constructor(@inject('RolesRepository') private rolesRepository: IRoleRepository) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new Error("Id is required");
        }
        await this.rolesRepository.deleteRole(id);
    }
}