import { Pet } from "../entities/Pet";

export interface IPetRepository {
  create(mascota: Partial<Pet>): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findAll(): Promise<Pet[]>;
  update(mascota: Partial<Pet>): Promise<Pet>;
  delete(id: string): Promise<void>;
}
