export class Role {
  constructor(
    public idRol: string,
    public nombre: string,
    public descripcion: string | null,
    public activo: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}