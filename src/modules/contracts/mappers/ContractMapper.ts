import { Contract } from '../infra/typeorm/entities/Contract'

export class ContractMapper {
  static toDTO(contract: Contract) {
    return {
      id: contract.id,
      user_id: contract.user_id,
      cemetery_id: contract.cemetery_id,
      funerary_id: contract.funerary_id,
      cemetery: contract.cemetery,
      funerary: contract.funerary,
      body_location_type: contract.body_location_type,
      body_city: contract.body_city,
      body_neighbourhood: contract.body_neighbourhood,
      body_street: contract.body_street,
      body_uf: contract.body_uf,
      body_number: contract.body_number,
      funeral_city: contract.funeral_city,
      funeral_date: contract.funeral_date,
      death_certificate_url: contract.death_certificate_url,
      total_price: contract.total_price,
      status: contract.status,
      created_at: contract.created_at,
      updated_at: contract.updated_at,
    }
  }
}
