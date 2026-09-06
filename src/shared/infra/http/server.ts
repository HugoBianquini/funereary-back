import 'dotenv/config'
import { AppDataSource } from '../typeorm/data-source'
import { app } from './app'

const PORT = process.env.PORT || 3333

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error initializing database:', err)
    process.exit(1)
  })
