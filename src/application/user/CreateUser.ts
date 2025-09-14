import { IUserRepository } from "../../domain/interfaces/User.interface";
import { IEncrypter } from "../../domain/interfaces/Encryption.interface";
import { User } from "../../domain/entities/User";
import { injectable, inject } from "tsyringe";
import { Password } from "../../domain/entities/Password";

@injectable()
export class CreateUser {
    constructor( 
        @inject('UserRepository') private userRepository: IUserRepository,
        @inject ('Encrypter') private encrypter: IEncrypter) {}

    async execute(userData: {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role?: string;
    }): Promise<void> {
        const hashedPassword = await this.encrypter.hash(userData.password);
        const user = new User(
            undefined,
            userData.name,
            userData.email,
            hashedPassword,
            userData.phone || null,
            new Date(),
            true,
            userData.role,
            new Date(),
            new Date()
        );
        await this.userRepository.createUser(user);
    }
}