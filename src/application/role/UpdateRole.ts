import {IRoleRepository} from '../../domain/interfaces/Role.interface';
import {Role} from '../../domain/entities/Role';
import {injectable, inject} from 'tsyringe';

@injectable()
export class UpdateRole {
    constructor(@inject('RolesRepository') private rolesRepository: IRoleRepository) {}

    async execute(Role: Role): Promise<Role> {
        if (!Role) {
            throw new Error("Role info is required");
        }
        return await this.rolesRepository.updateRole(Role);
    }
}