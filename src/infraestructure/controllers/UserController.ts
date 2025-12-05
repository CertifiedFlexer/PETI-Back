import { FastifyRequest, FastifyReply } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { CreateUser } from '../../application/user/CreateUser';
import { GetAllUsers } from '../../application/user/GetAllUser';
import { GetUserById } from '../../application/user/GetUserById';
import { ToogleActive } from '../../application/user/ToogleActivate';
import { UpdateUser } from '../../application/user/UpdateUser';
import { ChangePassword } from '../../application/user/ChangePassword';
import { LoginUser } from '../../application/user/Login';

@injectable()
export class UserController {
    constructor(
        @inject('CreateUser') private createUserUseCase: CreateUser,
        @inject('GetAllUsers') private getAllUsersUseCase: GetAllUsers,
        @inject('GetUserById') private getUserByIdUseCase: GetUserById,
        @inject('ToogleActive') private toogleActiveUseCase: ToogleActive,
        @inject('UpdateUser') private updateUserUseCase: UpdateUser,
        @inject('ChangePassword') private changePasswordUseCase: ChangePassword,
        @inject('LoginUser') private loginUserUseCase: LoginUser
    ) { }
 async createUser(
    req: FastifyRequest<{ Body: { nombre: string; email: string; contraseña: string; rol?: string; telefono?: string } }>,
    reply: FastifyReply
  ) {
    try {
      const mappedUser = {
        name: req.body.nombre,
        email: req.body.email,
        password: req.body.contraseña,
        role: req.body.rol ?? "user", // default role si no lo envías
        phone: req.body.telefono,
      };

      const created = await this.createUserUseCase.execute(mappedUser);
      return reply.code(201).send({ success: true, data: created });
    } catch (error) {
      return reply.code(500).send({ success: false, message: "Error creating user", error });
    }
  }

  async login(
    req: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { email, password } = req.body;
      const loginResult = await this.loginUserUseCase.execute(email, password);
      return reply.code(200).send({ success: true, data: loginResult });
    } catch (error) {
      return reply.code(401).send({ success: false, message: "Invalid credentials", error });
    }
  }

  async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.getAllUsersUseCase.execute();
      return reply.send({ success: true, data: users });
    } catch (error) {
      return reply.code(500).send({ success: false, message: "Error fetching users", error });
    }
  }

  async getUserById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = req.params;
      const user = await this.getUserByIdUseCase.execute(id);
      if (!user) {
        return reply.code(404).send({ success: false, message: "User not found" });
      }
      return reply.send({ success: true, data: user });
    } catch (error) {
      return reply.code(500).send({ success: false, message: "Error fetching user", error });
    }
  }

  async toogleActive(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = req.params;
      const user = await this.toogleActiveUseCase.execute(id);
      return reply.send({ success: true, data: user });
    } catch (error) {
      return reply.code(500).send({ success: false, message: "Error toggling user active status", error });
    }
  }

  async updateUser(
    req: FastifyRequest<{ Body: { id_usuario: string; nombre?: string; email?: string; telefono?: string } }>,
    reply: FastifyReply
  ) {
    try {
      // mapeo de body → dominio
      const mappedUser = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        idUsuario: req.body.id_usuario
      };
      console.log(mappedUser);

      const updatedUser = await this.updateUserUseCase.execute(mappedUser);
      return reply.send({ success: true, data: updatedUser });
    } catch (error) {
      return reply.code(500).send({ success: false, message: "Error updating user", error });
    }
  }

  async changePassword(
    req: FastifyRequest<{ Params: { id: string }; Body: { newPassword: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id  = req.params.id;
      const { newPassword } = req.body;
      const updatedUser = await this.changePasswordUseCase.execute(id, newPassword);
      return reply.send({ success: true, data: updatedUser });
    } catch (error) {
      return reply.code(500).send({ success: false, message: "Error changing password", error });
    }
  }
}
