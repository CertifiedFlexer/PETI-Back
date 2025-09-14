import { IEncrypter } from "../../domain/interfaces/Encryption.interface";
import bcrypt from "bcryptjs";

export class BcryptEncrypter implements IEncrypter {
    async hash(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}