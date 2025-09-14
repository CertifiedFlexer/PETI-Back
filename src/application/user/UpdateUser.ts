import { IUserRepository } from "../../domain/interfaces/User.interface";
import { User } from "../../domain/entities/User";
import { injectable, inject } from "tsyringe";

@injectable()
export class UpdateUser {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

    async execute(user: Partial<User>): Promise<User> {
        return await this.userRepository.updateUser(user);
    }
}