import { AnimalEntity } from "src/stays/domain/animal-entity"

export class AnimalRow {
    id: string
    quantity: number
    type_animal: string
    id_group: string

    static convertEntityToRow(animalEntity: AnimalEntity, idGroup): AnimalRow {
        const row = new AnimalRow()
        row.quantity = animalEntity.quantity
        row.type_animal = animalEntity.typeAnimal
        row.id_group = idGroup

        return row
    }
}