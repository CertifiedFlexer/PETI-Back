import { IUserRepository } from "../../domain/interfaces/User.interface";
import { User } from "../../domain/entities/User";
import { Password } from "../../domain/entities/Password";
import { injectable, inject } from "tsyringe";

@injectable()
export class ChangePassword {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

    async execute(id: string, newPassword: string): Promise<User> {
        if (!id || !newPassword) {
            throw new Error("User ID and new password are required");
        }
        return await this.userRepository.changePassword(id, new Password(newPassword).getValue());
    }
}