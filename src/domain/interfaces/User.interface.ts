import { User } from "../entities/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    login(email: string): Promise<Partial<User> | null>;
    updateUser(user: Partial<User>): Promise<User>;
    getUserById(id: string): Promise<Partial<User> | null>;
    getAllUsers(): Promise<Partial<User[]> | null>;
    toogleActive(id: string): Promise<User>;
    changePassword(id: string, newPassword: String): Promise<User>;
}