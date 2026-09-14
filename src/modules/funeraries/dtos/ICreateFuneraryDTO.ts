export interface ICreateFuneraryDTO {
  name: string
  city: string
  neighbourhood: string
  street?: string
  lat?: number
  lng?: number
  price: number
  includes_casket?: boolean
  image_url?: string
  active?: boolean
}
