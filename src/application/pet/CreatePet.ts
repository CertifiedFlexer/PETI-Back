import { Pet } from "../../domain/entities/Pet";
import { IPetRepository } from "../../domain/interfaces/Pet.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class CreatePet {
  constructor(@inject("PetRepository") private petRepository: IPetRepository) {}

  async execute(data: Partial<Pet>): Promise<Pet> {
    const formattedData = {
        nombre: data.nombre,
        especie: data.especie,
        raza: data.raza || null,
        fecha_nacimiento: data.fecha_nacimiento || null,
        peso: data.peso || null,
        observaciones: data.observaciones || null,
        activo: true,
        id_usuario: data.id_usuario
    };
    const pet = await this.petRepository.create(formattedData);
    return pet;
  }
}