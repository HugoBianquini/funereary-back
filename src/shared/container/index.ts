import { container } from 'tsyringe'

import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'

import { ICemeteryRepository } from '@modules/cemiteries/repositories/ICemeteryRepository'
import { CemeteryRepository } from '@modules/cemiteries/infra/typeorm/repositories/CemeteryRepository'

import { IFuneraryRepository } from '@modules/funeraries/repositories/IFuneraryRepository'
import { FuneraryRepository } from '@modules/funeraries/infra/typeorm/repositories/FuneraryRepository'

import { IContractRepository } from '@modules/contracts/repositories/IContractRepository'
import { ContractRepository } from '@modules/contracts/infra/typeorm/repositories/ContractRepository'

import { IPaymentRepository } from '@modules/payments/repositories/IPaymentRepository'
import { PaymentRepository } from '@modules/payments/infra/typeorm/repositories/PaymentRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<ICemeteryRepository>('CemeteryRepository', CemeteryRepository)
container.registerSingleton<IFuneraryRepository>('FuneraryRepository', FuneraryRepository)
container.registerSingleton<IContractRepository>('ContractRepository', ContractRepository)
container.registerSingleton<IPaymentRepository>('PaymentRepository', PaymentRepository)
