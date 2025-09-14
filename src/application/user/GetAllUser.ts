import { IUserRepository } from "../../domain/interfaces/User.interface";
import { User } from "../../domain/entities/User";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetAllUsers {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

    async execute(): Promise<Partial<User[]>|null> {
        return await this.userRepository.getAllUsers();
    }
}