import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js'
import tasksRoutes from './src/routes/tasks.routes.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('SERVIDOR ONLINE')
})

app.use('/auth', authRoutes)
app.use('/tasks', tasksRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})