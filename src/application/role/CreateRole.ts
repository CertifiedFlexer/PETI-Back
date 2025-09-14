import {IRoleRepository} from '../../domain/interfaces/Role.interface';
import {Role} from '../../domain/entities/Role';
import {injectable, inject} from 'tsyringe';

@injectable()
export class CreateRole {
    constructor(
        @inject('RolesRepository') 
        private rolesRepository: IRoleRepository
    ) {}

    async execute(data:{nombre: string; descripcion?: string}): Promise<Role> {
        const role = new Role(
            undefined,            
            data.nombre,           
            data.descripcion || null, 
            true,                  
            new Date(),            
            new Date()             
        );
        
        return await this.rolesRepository.createRole(role);
    }
}