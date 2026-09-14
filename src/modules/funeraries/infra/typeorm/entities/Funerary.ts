import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('funeraries')
export class Funerary {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  image_url: string

  @Column()
  city: string

  @Column()
  neighbourhood: string

  @Column({ nullable: true })
  street: string

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  lat: number

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  lng: number

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column({ default: false })
  includes_casket: boolean

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
