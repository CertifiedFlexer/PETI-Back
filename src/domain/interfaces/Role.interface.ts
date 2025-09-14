import { Role } from "../entities/Role";

export interface IRoleRepository {
    createRole(role:Role): Promise<Role>;
    getRoleById(id: string): Promise<Role | null>;
    getAllRoles(): Promise<Role[] | null>;
    updateRole(role: Role): Promise<Role>;
    deleteRole(id: string): Promise<void>;
}