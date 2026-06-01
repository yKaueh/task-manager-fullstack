import { db } from '../database/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function registerService(username, email, password) {
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email])

    if(rows.length > 0){
        return null
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword])

    return {
        id: result.insertId,
        username,
        email
    };
}

export async function loginService(email, password) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    const user = rows[0]

    if(!user){
        return null
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return null
    }

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }

}