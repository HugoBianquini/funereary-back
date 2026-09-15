import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Contract } from '@modules/contracts/infra/typeorm/entities/Contract'

export type PaymentMethod = 'CREDIT_CARD' | 'PIX' | 'BOLETO'
export type PaymentStatus = 'PENDING' | 'APPROVED' | 'FAILED' | 'REFUNDED'

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract

  @Column()
  contract_id: string

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number

  @Column({ type: 'enum', enum: ['CREDIT_CARD', 'PIX', 'BOLETO'] })
  method: PaymentMethod

  @Column({
    type: 'enum',
    enum: ['PENDING', 'APPROVED', 'FAILED', 'REFUNDED'],
    default: 'PENDING',
  })
  status: PaymentStatus

  @Column({ type: 'timestamp', nullable: true })
  paid_at: Date

  @CreateDateColumn()
  created_at: Date
}
