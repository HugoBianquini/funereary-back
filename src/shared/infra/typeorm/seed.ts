import 'dotenv/config'
import 'reflect-metadata'
import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { hash } from 'bcryptjs'
import { AppDataSource } from './data-source'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { Cemetery } from '@modules/cemiteries/infra/typeorm/entities/Cemetery'
import { Funerary } from '@modules/funeraries/infra/typeorm/entities/Funerary'
import { Contract } from '@modules/contracts/infra/typeorm/entities/Contract'
import { Payment } from '@modules/payments/infra/typeorm/entities/Payment'

async function downloadImage(url: string, dest: string): Promise<void> {
  if (fs.existsSync(dest)) return
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(dest)
    const req = client.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        fs.unlinkSync(dest)
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject)
      }
      res.pipe(file)
      file.on('finish', () => file.close(() => resolve()))
    })
    req.on('error', async () => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest)
      const slug = path.basename(dest, path.extname(dest))
      try {
        await downloadImage(`https://picsum.photos/seed/${slug}/800/600`, dest)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  })
}

async function downloadAllImages(): Promise<void> {
  const base = path.resolve('public', 'images')
  const images = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Cemit%C3%A9rio_S%C3%A3o_Jo%C3%A3o_Batista_13.jpg',
      dest: path.join(base, 'cemiteries', 'sao-joao-batista.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/caju/800/600',
      dest: path.join(base, 'cemiteries', 'caju.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/inhauma/800/600',
      dest: path.join(base, 'cemiteries', 'inhauma.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/catumbi/800/600',
      dest: path.join(base, 'cemiteries', 'catumbi.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/lucena/800/600',
      dest: path.join(base, 'funeraries', 'lucena.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/jardim-eden/800/600',
      dest: path.join(base, 'funeraries', 'jardim-do-eden.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/luz-divina/800/600',
      dest: path.join(base, 'funeraries', 'luz-divina.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/caminho-paz/800/600',
      dest: path.join(base, 'funeraries', 'caminho-da-paz.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/nova-esperanca/800/600',
      dest: path.join(base, 'funeraries', 'nova-esperanca.jpg'),
    },
    {
      url: 'https://picsum.photos/seed/estrela-oriente/800/600',
      dest: path.join(base, 'funeraries', 'estrela-do-oriente.jpg'),
    },
  ]
  console.log('Baixando imagens...')
  for (const img of images) {
    try {
      await downloadImage(img.url, img.dest)
      console.log(`  OK: ${path.relative(process.cwd(), img.dest)}`)
    } catch {
      console.warn(`  WARN: falha ao baixar ${img.dest}`)
    }
  }
}

async function main(): Promise<void> {
  await AppDataSource.initialize()
  console.log('Banco conectado.')

  await downloadAllImages()

  const userRepo = AppDataSource.getRepository(User)
  const cemeteryRepo = AppDataSource.getRepository(Cemetery)
  const funeraryRepo = AppDataSource.getRepository(Funerary)
  const contractRepo = AppDataSource.getRepository(Contract)
  const paymentRepo = AppDataSource.getRepository(Payment)

  const passwordHash = await hash('senha123', 8)

  console.log('Inserindo usuários...')
  const [joao, maria] = await userRepo.save([
    { name: 'João Silva', email: 'joao.silva@funereasy.com', password_hash: passwordHash, cpf: '12345678901', phone_number: '21999990001' },
    { name: 'Maria Souza', email: 'maria.souza@funereasy.com', password_hash: passwordHash, cpf: '98765432100', phone_number: '21999990002' },
    { name: 'Carlos Lima', email: 'carlos.lima@funereasy.com', password_hash: passwordHash, cpf: '11122233344', phone_number: '21999990003' },
  ])

  console.log('Inserindo cemitérios...')
  const [saoJoao, caju] = await cemeteryRepo.save([
    { name: 'Cemitério São João Batista', city: 'Rio de Janeiro', neighbourhood: 'Botafogo', street: 'R. Gen. Polidoro, s/n', lat: -22.953573, lng: -43.189501, price: 10000.00, image_url: '/images/cemiteries/sao-joao-batista.jpg' },
    { name: 'Cemitério do Caju', city: 'Rio de Janeiro', neighbourhood: 'Caju', street: 'Av. Monsenhor Manuel Gomes, s/n', lat: -22.883333, lng: -43.209167, price: 8000.00, image_url: '/images/cemiteries/caju.jpg' },
    { name: 'Cemitério de Inhaúma', city: 'Rio de Janeiro', neighbourhood: 'Inhaúma', street: 'R. Monsenhor José Vieira, 100', lat: -22.875267, lng: -43.293712, price: 7500.00, image_url: '/images/cemiteries/inhauma.jpg' },
    { name: 'Cemitério do Catumbi', city: 'Rio de Janeiro', neighbourhood: 'Catumbi', street: 'R. Catumbi, s/n', lat: -22.914235, lng: -43.201452, price: 9500.00, image_url: '/images/cemiteries/catumbi.jpg' },
  ])

  console.log('Inserindo funerárias...')
  const [lucena, jardinEden] = await funeraryRepo.save([
    { name: 'Lucena Funerária', city: 'Rio de Janeiro', neighbourhood: 'Centro', street: 'Rua das Flores, 123', lat: -22.908333, lng: -43.197000, price: 5000.00, includes_casket: true, image_url: '/images/funeraries/lucena.jpg' },
    { name: 'Funerária Jardim do Éden', city: 'Rio de Janeiro', neighbourhood: 'Copacabana', street: 'Avenida Atlântica, 456', lat: -22.971964, lng: -43.182545, price: 4500.00, includes_casket: false, image_url: '/images/funeraries/jardim-do-eden.jpg' },
    { name: 'Funerária Luz Divina', city: 'Rio de Janeiro', neighbourhood: 'Botafogo', street: 'Rua Voluntários da Pátria, 789', lat: -22.949700, lng: -43.184300, price: 6000.00, includes_casket: true, image_url: '/images/funeraries/luz-divina.jpg' },
    { name: 'Funerária Caminho da Paz', city: 'Rio de Janeiro', neighbourhood: 'Ipanema', street: 'Rua Visconde de Pirajá, 101', lat: -22.983600, lng: -43.207500, price: 5500.00, includes_casket: true, image_url: '/images/funeraries/caminho-da-paz.jpg' },
    { name: 'Funerária Nova Esperança', city: 'Rio de Janeiro', neighbourhood: 'Leblon', street: 'Avenida Ataulfo de Paiva, 202', lat: -22.983600, lng: -43.223800, price: 4800.00, includes_casket: false, image_url: '/images/funeraries/nova-esperanca.jpg' },
    { name: 'Funerária Estrela do Oriente', city: 'Rio de Janeiro', neighbourhood: 'Barra da Tijuca', street: 'Avenida das Américas, 303', lat: -23.000600, lng: -43.365600, price: 5200.00, includes_casket: true, image_url: '/images/funeraries/estrela-do-oriente.jpg' },
  ])

  console.log('Inserindo contratos...')
  const [c1, c2] = await contractRepo.save([
    {
      user_id: joao.id,
      cemetery_id: saoJoao.id,
      funerary_id: jardinEden.id,
      body_location_type: 'HOSPITAL',
      body_city: 'Rio de Janeiro',
      body_neighbourhood: 'Botafogo',
      body_street: 'Rua das Laranjeiras',
      body_uf: 'RJ',
      body_number: 100,
      funeral_city: 'Rio de Janeiro',
      funeral_date: '2026-10-15',
      total_price: Number(saoJoao.price) + Number(jardinEden.price),
      status: 'CONFIRMED',
    },
    {
      user_id: maria.id,
      cemetery_id: caju.id,
      funerary_id: lucena.id,
      body_location_type: 'RESIDENCE',
      body_city: 'Rio de Janeiro',
      body_neighbourhood: 'Copacabana',
      body_street: 'Avenida Atlântica',
      body_uf: 'RJ',
      body_number: 200,
      funeral_city: 'Rio de Janeiro',
      funeral_date: '2026-10-20',
      total_price: Number(caju.price) + Number(lucena.price),
      status: 'PENDING',
    },
  ])

  console.log('Inserindo pagamentos...')
  await paymentRepo.save([
    { contract_id: c1.id, amount: c1.total_price, method: 'PIX', status: 'APPROVED', paid_at: new Date() },
    { contract_id: c2.id, amount: c2.total_price, method: 'CREDIT_CARD', status: 'PENDING' },
  ])

  await AppDataSource.destroy()
  console.log('Seed concluído com sucesso.')
}

main().catch((err) => {
  console.error('Erro no seed:', err)
  process.exit(1)
})
