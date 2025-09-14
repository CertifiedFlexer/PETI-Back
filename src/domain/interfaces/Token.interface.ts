export interface ITokenService {
  generate(payload: object, expiresIn?: string): string;
  verify(token: string): object;
}