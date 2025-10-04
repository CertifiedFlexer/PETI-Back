import { Pet } from "../../domain/entities/Pet";
import { IPetRepository } from "../../domain/interfaces/Pet.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class UpdatePet {
  constructor(@inject("PetRepository") private petRepository: IPetRepository) {}

  async execute(data: Pet): Promise<Pet> {    
    const formattedData = {
        nombre: data.nombre,
        especie: data.especie,
        raza: data.raza || null,
        fecha_nacimiento: data.fecha_nacimiento || null,
        peso: data.peso || null,
        observaciones: data.observaciones || null,
        activo: data.activo,
        id_usuario: data.id_usuario,
        updated_at: new Date()
    };
    const pet = await this.petRepository.update(formattedData);
    return pet;
  }
}