import {IRoleRepository} from '../../domain/interfaces/Role.interface';
import {Role} from '../../domain/entities/Role';
import {injectable, inject} from 'tsyringe';

@injectable()
export class GetAllRoles {
    constructor(@inject('RolesRepository') private rolesRepository: IRoleRepository) {}

    async execute(): Promise<Role[]> {
        return await this.rolesRepository.getAllRoles();
    }
}