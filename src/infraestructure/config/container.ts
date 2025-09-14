import { container } from 'tsyringe';
import { IUserRepository } from '../../domain/interfaces/User.interface';
import { IRoleRepository } from '../../domain/interfaces/Role.interface';
import { ITokenService } from '../../domain/interfaces/Token.interface';
import { PostgresUserRepository } from '../database/PostgresUserRepository';
import { PostgresRoleRepository } from '../database/PostgresRoleRepository';
import { UserController } from '../controllers/UserController';
import { RoleController } from '../controllers/RoleController';
import { CreateUser } from '../../application/user/CreateUser';
import { GetAllUsers } from '../../application/user/GetAllUser';
import { GetUserById } from '../../application/user/GetUserById';
import { ToogleActive } from '../../application/user/ToogleActivate';
import { UpdateUser } from '../../application/user/UpdateUser';
import { ChangePassword } from '../../application/user/ChangePassword';
import { LoginUser } from '../../application/user/Login';
import { IEncrypter } from '../../domain/interfaces/Encryption.interface';
import { BcryptEncrypter } from '../security/PassEncryption';
import { CreateRole } from '../../application/role/CreateRole';
import { UpdateRole } from '../../application/role/UpdateRole';
import { DeleteRole } from '../../application/role/DeleteRole';
import { GetAllRoles } from '../../application/role/GetAllRoles';
import { GetRoleById } from '../../application/role/GetRoleById';
import { JwtTokenService } from '../security/JwtTokenService';
import { pool } from '../database/db';
import { Pool } from 'pg';

container.registerInstance<Pool>('Pool', pool);
container.register<IUserRepository>('UserRepository', {
  useClass: PostgresUserRepository
});
container.register<IEncrypter>('Encrypter', {
    useClass: BcryptEncrypter
});
container.register<IRoleRepository>('RolesRepository',{
    useClass: PostgresRoleRepository
});
container.register<ITokenService>('ITokenService',{
    useValue: new JwtTokenService(process.env.JWT_SECRET)
});
container.register('GetUserById', {
    useClass: GetUserById
});
container.register('UserController', {
    useClass: UserController
});
container.register('RoleController', {
    useClass: RoleController
});
container.register('CreateUser', {
    useClass: CreateUser
});
container.register('GetAllUsers', {
    useClass: GetAllUsers
});
container.register('ToogleActive', {
    useClass: ToogleActive
});
container.register('UpdateUser', {
    useClass: UpdateUser
});
container.register('ChangePassword', {
    useClass: ChangePassword
});
container.register('LoginUser', {
    useClass: LoginUser
});
container.register('CreateRole',{
    useClass: CreateRole
});
container.register('UpdateRole',{
    useClass: UpdateRole
});
container.register('DeleteRole',{
    useClass: DeleteRole
});
container.register('GetAllRoles',{
    useClass:GetAllRoles
});
container.register('GetRoleById',{
    useClass: GetRoleById
});