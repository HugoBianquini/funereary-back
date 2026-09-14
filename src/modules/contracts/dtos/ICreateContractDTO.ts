export type BodyLocationType = 'HOSPITAL' | 'RESIDENCE' | 'IML'

export interface ICreateContractDTO {
  user_id: string
  cemetery_id: string
  funerary_id: string
  body_location_type: BodyLocationType
  body_city: string
  body_neighbourhood: string
  body_street?: string
  body_uf?: string
  body_number?: number
  funeral_city: string
  funeral_date: string
  total_price: number
}
