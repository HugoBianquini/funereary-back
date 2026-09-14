import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { Cemetery } from '@modules/cemiteries/infra/typeorm/entities/Cemetery'
import { Funerary } from '@modules/funeraries/infra/typeorm/entities/Funerary'

export type BodyLocationType = 'HOSPITAL' | 'RESIDENCE' | 'IML'
export type ContractStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  user_id: string

  @ManyToOne(() => Cemetery)
  @JoinColumn({ name: 'cemetery_id' })
  cemetery: Cemetery

  @Column()
  cemetery_id: string

  @ManyToOne(() => Funerary)
  @JoinColumn({ name: 'funerary_id' })
  funerary: Funerary

  @Column()
  funerary_id: string

  @Column({ type: 'enum', enum: ['HOSPITAL', 'RESIDENCE', 'IML'] })
  body_location_type: BodyLocationType

  @Column()
  body_city: string

  @Column()
  body_neighbourhood: string

  @Column({ nullable: true })
  body_street: string

  @Column({ nullable: true })
  body_uf: string

  @Column({ nullable: true })
  body_number: number

  @Column()
  funeral_city: string

  @Column({ type: 'date' })
  funeral_date: string

  @Column({ nullable: true })
  death_certificate_url: string

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number

  @Column({
    type: 'enum',
    enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: ContractStatus

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
