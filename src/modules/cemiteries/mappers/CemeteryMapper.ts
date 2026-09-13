import { Cemetery } from '../infra/typeorm/entities/Cemetery'

export class CemeteryMapper {
  static toDTO(cemetery: Cemetery) {
    return {
      id: cemetery.id,
      name: cemetery.name,
      image_url: cemetery.image_url,
      city: cemetery.city,
      neighbourhood: cemetery.neighbourhood,
      street: cemetery.street,
      lat: cemetery.lat,
      lng: cemetery.lng,
      price: cemetery.price,
      active: cemetery.active,
      created_at: cemetery.created_at,
      updated_at: cemetery.updated_at,
    }
  }
}
