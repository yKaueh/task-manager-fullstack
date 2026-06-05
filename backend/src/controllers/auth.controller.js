import { registerService, loginService } from '../services/auth.service.js'

export async function registerController(req, res) {
    const { username, email, password } = req.body

    if(!username || !email || !password){
        return res.status(400).json({message: 'Campos obrigatórios'})
    }

    const user = await registerService(username, email, password)

    if(!user){
        return res.status(409).json({message: 'Email já cadastrado'})
    }

    res.status(201).json(user)
}

export async function loginController(req, res) {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({message: 'Campos obrigatórios'})
    }

    const user = await loginService(email, password)

    if(!user){
        return res.status(401).json({message: 'Credenciais inválidas'})
    }

    res.json(user)
}