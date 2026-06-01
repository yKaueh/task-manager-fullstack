import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    if(!cleanEmail || !cleanPassword){
      console.log('Campos vazios')
      return
    }
    if(!cleanEmail.includes("@")){
      console.log('Email inválido')
      return
    }

    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.user.username)
      navigate('/')
    } catch (error) {
      throw new Error("Erro:", error)
    }
  }

  return (
    <main>
        <section className="auth-section">
          <h2>Fazer login</h2>
          <form onSubmit={handleSubmit}>
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
              <button className="btn btn-primary" type="submit">Entrar</button>
          </form>
          <p className="link">
              Não tem uma conta?{" "}
              <Link to="/auth/register">Cadastrar</Link>
          </p>
        </section>
    </main>
  )
}

export default LoginPage;