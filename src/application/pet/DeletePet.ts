import { Pet } from "../../domain/entities/Pet";
import { IPetRepository } from "../../domain/interfaces/Pet.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class DeletePet {
  constructor(@inject("PetRepository") private petRepository: IPetRepository) {}

  async execute(id: string): Promise<void> {
    await this.petRepository.delete(id);
  }
}