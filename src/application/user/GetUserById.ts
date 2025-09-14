import {IUserRepository} from "../../domain/interfaces/User.interface";
import {User} from "../../domain/entities/User";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetUserById {
    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

    async execute(id: string): Promise<Partial<User> | null> {
        if (!id) {
            throw new Error("User ID is required");
        }
        return await this.userRepository.getUserById(id);
    }
}