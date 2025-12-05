import { container } from 'tsyringe';
import { IUserRepository } from '../../domain/interfaces/User.interface';
import { IRoleRepository } from '../../domain/interfaces/Role.interface';
import { ITokenService } from '../../domain/interfaces/Token.interface';
import { PostgresUserRepository } from '../database/PostgresUserRepository';
import { PostgresRoleRepository } from '../database/PostgresRoleRepository';
import { PostgresProviderRepository } from '../database/PostgresProviderRepository';
import { PostgresPetRepository } from '../database/PostgresPetRepository';
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
import { IProviderRepository } from '../../domain/interfaces/Provider.interface';
import { IPetRepository } from '../../domain/interfaces/Pet.interface';
import { CreateProvider } from '../../application/provider/CreateProvider';
import { CreatePet } from '../../application/pet/CreatePet';
import { GetProviderByUser } from '../../application/provider/GetByUser';
import { GetPetByUser } from '../../application/pet/GetByUser';
import { DeletePet } from '../../application/pet/DeletePet';
import { GetAllPets } from '../../application/pet/GetAllPets';
import { UpdatePet } from '../../application/pet/UpdatePet';
import { DeleteProvider } from '../../application/provider/DeleteProvider';
import { GetAllProviders } from '../../application/provider/GetAllProviders';
import { GetProvider } from '../../application/provider/GetProvider';
import { UpdateProvider } from '../../application/provider/UpdateProvider';
import { GetProvidersByService } from '../../application/provider/GetProviderByService';
import { CitaService } from '../../application/appointment/Appointment.service';
import { PostgresAppointmentRepository } from '../database/PostgresAppointmentRepository';
import { CitaController } from '../controllers/AppointmentController';
import { ProviderImageService } from '../../application/provider/ProviderImage.service';
import { UpdateSubscription } from '../../application/provider/updateSubscription';

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
container.register<IProviderRepository>('ProviderRepository',{
    useClass: PostgresProviderRepository
});
container.register<IPetRepository>('PetRepository',{
    useClass: PostgresPetRepository
});
container.register<ITokenService>('ITokenService',{
    useValue: new JwtTokenService(process.env.JWT_SECRET)
});
container.register('AppointmentRepository',{
    useClass: PostgresAppointmentRepository
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
container.register('CreatePet',{
    useClass: CreatePet
});
container.register('DeletePet',{
    useClass: DeletePet
});
container.register('GetAllPets',{
    useClass: GetAllPets
});
container.register('GetPet',{
    useClass: GetPetByUser
});
container.register('UpdatePet',{
    useClass: UpdatePet
});
container.register('GetPetByUser',{
    useClass: GetPetByUser
});
container.register('CreateProvider',{
    useClass: CreateProvider
});
container.register('DeleteProvider',{
    useClass: DeleteProvider
});
container.register('GetAllProviders',{
    useClass: GetAllProviders
});
container.register('GetProvider',{
    useClass: GetProvider
});
container.register('UpdateProvider',{
    useClass: UpdateProvider
});
container.register('GetProviderByUser',{
    useClass: GetProviderByUser
});
container.register("GetProvidersByService",{ 
    useClass: GetProvidersByService 
});
container.register('AppointmentService',{
    useClass: CitaService
});
container.register('CitaController',{
    useClass: CitaController
});
container.register("ProviderImageService",{ 
    useClass: ProviderImageService
});
container.register("UpdateSubscription",{
    useClass: UpdateSubscription
});