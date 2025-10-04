import { Pet } from "../../domain/entities/Pet";
import { IPetRepository } from "../../domain/interfaces/Pet.interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetPetByUser {
  constructor(@inject("PetRepository") private petRepository: IPetRepository) {}

  async execute(userId: string): Promise<Pet[]> {
    return this.petRepository.findByUserId(userId);
  }
}