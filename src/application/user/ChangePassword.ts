import { IUserRepository } from "../../domain/interfaces/User.interface";
import { User } from "../../domain/entities/User";
import { Password } from "../../domain/entities/Password";
import { injectable, inject } from "tsyringe";
import { IEncrypter } from "../../domain/interfaces/Encryption.interface";

@injectable()
export class ChangePassword {
    constructor(@inject('UserRepository') private userRepository: IUserRepository,
            @inject ('Encrypter') private encrypter: IEncrypter) {}

    async execute(id: string, newPassword: string): Promise<User> {
        if (!id || !newPassword) {
            throw new Error("User ID and new password are required");
        }
        const hashedPassword = new Password(await this.encrypter.hash(newPassword));
        return await this.userRepository.changePassword(id, hashedPassword.getValue());
    }
}