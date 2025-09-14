import jwt from 'jsonwebtoken';
import { ITokenService } from '../../domain/interfaces/Token.interface';

export class JwtTokenService implements ITokenService {
  constructor(private secret: string) {
  }
  generate(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }
  verify(token: string): object {
    try {
      return jwt.verify(token, this.secret) as object;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}