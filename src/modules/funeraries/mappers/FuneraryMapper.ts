import { Funerary } from '../infra/typeorm/entities/Funerary'

export class FuneraryMapper {
  static toDTO(funerary: Funerary) {
    return {
      id: funerary.id,
      name: funerary.name,
      image_url: funerary.image_url,
      city: funerary.city,
      neighbourhood: funerary.neighbourhood,
      street: funerary.street,
      lat: funerary.lat,
      lng: funerary.lng,
      price: funerary.price,
      includes_casket: funerary.includes_casket,
      active: funerary.active,
      created_at: funerary.created_at,
      updated_at: funerary.updated_at,
    }
  }
}
