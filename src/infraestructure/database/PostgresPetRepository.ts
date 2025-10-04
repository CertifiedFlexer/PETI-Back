import { Pet } from "../../domain/entities/Pet";
import { IPetRepository } from "../../domain/interfaces/Pet.interface";
import { injectable, inject } from "tsyringe";
import { Pool } from "pg";

@injectable()
export class PostgresPetRepository implements IPetRepository {
  constructor(@inject("Pool") private pool: Pool) {}
    async create(data: Partial<Pet>): Promise<Pet> {
      const result = await this.pool.query("INSERT INTO peti_bd.mascota (nombre, especie, raza, fecha_nacimiento, peso, observaciones, activo, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [data.nombre, data.especie, data.raza, data.fecha_nacimiento, data.peso, data.observaciones, data.activo, data.id_usuario]);
      const newPet = result.rows[0];
      return newPet;
    }

    async update(data: Pet): Promise<Pet> {
      const result = await this.pool.query("UPDATE peti_bd.mascota SET nombre = $1, especie = $2, raza = $3, fecha_nacimiento = $4, peso = $5, observaciones = $6 WHERE id = $7 RETURNING *", [data.nombre, data.especie, data.raza, data.fecha_nacimiento, data.peso, data.observaciones, data.id_mascota]);
      const updatedPet = result.rows[0];
      return updatedPet;
    }
    async findById(id: string): Promise<Pet> {
      const result = await this.pool.query("SELECT * FROM peti_bd.mascota WHERE id = $1", [id]);
      const pet = result.rows[0];
      return pet;
    }
    async findAll(): Promise<Pet[]> {
        const result = await this.pool.query("SELECT * FROM peti_bd.mascota");
        return result.rows;
    }
    async findByUserId(userId: string): Promise<Pet[]> {
      const result = await this.pool.query("SELECT * FROM peti_bd.mascota WHERE id_usuario = $1 AND activo = true", [userId]);
      return result.rows;
    }
    async delete(id: string): Promise<void> {
      await this.pool.query("UPDATE peti_bd.mascota SET activo = false WHERE id = $1", [id]);
    }
}