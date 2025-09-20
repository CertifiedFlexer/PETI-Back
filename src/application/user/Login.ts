import { IUserRepository } from '../../domain/interfaces/User.interface';
import { IEncrypter } from '../../domain/interfaces/Encryption.interface';
import { ITokenService } from '../../domain/interfaces/Token.interface';
import { injectable, inject } from 'tsyringe';

@injectable()
export class LoginUser {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('Encrypter') private encrypter: IEncrypter,
    @inject('ITokenService') private tokenService: ITokenService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.login(email);
    if (!user) throw new Error('No user found');
    const isPasswordValid = await this.encrypter.compare(password, user.contraseña);
    console.log("aprobada")
    if (!isPasswordValid) throw new Error('Invalid credentials');
    console.log('User logged in:', user.email);
    const token = this.tokenService.generate({ userId: user.idUsuario, rol: user.idRol });
    console.log('Generated token:', token);
    return { token, id: user.idUsuario, name:user.nombre, email: user.email };
  }
}