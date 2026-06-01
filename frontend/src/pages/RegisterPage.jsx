import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { register } from "../services/authService"

const RegisterPage = () => {
  const [username, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanUsername = username.trim()
    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    if(!cleanUsername || !cleanEmail || !cleanPassword){
      console.log('Campos vazios')
      return
    }
    if(!cleanEmail.includes("@")){
      console.log('Email inválido')
      return
    }
    if(cleanPassword.length < 6){
      console.log('Senha muito curta')
      return
    }
    try {
      await register(cleanUsername, cleanEmail, cleanPassword)
      navigate("/auth/login")
    } catch (error) {
      console.log("Erro:", error)
    }
  }

  return (

    <main>
        <section className="auth-section">
          <h2>Cadastrar usuário</h2>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">Nome de usuário:</label>
              <input className="input" type="text" name="username" id="username"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input className="input" type="email" name="email" id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Senha:</label>
              <input className="input" type="password" name="password" id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">Cadastrar</button>
          </form>
          <p className="link">
            Já possui uma conta?{" "}
            <Link to="/auth/login">Fazer login</Link>
          </p>
        </section>
    </main>
  )
}

export default RegisterPage