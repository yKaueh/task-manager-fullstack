import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const isLoggedIn = !!token
  const navigate = useNavigate()

  function handleLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/auth/login')
  }

  return (
    <header>
        <h1 className='header-title'>Lista de tarefas</h1>
        {isLoggedIn && 
          <div className="user-info">
            <p className="user-name">{username}</p>
            <div className="user-info-buttons">
              <button className='btn btn-ghost' onClick={() => handleLogout()}>Sair</button>
            </div>
          </div>
        }
    </header>
  )
}

export default Header