import { Password } from "./Password";
export class User {
  constructor(
    public idUsuario: string,
    public nombre: string,
    public email: string,
    public contraseña: string,
    public telefono: string | null,
    public fechaRegistro: Date,
    public activo: boolean,
    public idRol: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}