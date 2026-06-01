import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import TaskPage from './pages/TaskPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<TaskPage />} />
        <Route path='/auth/register' element={<RegisterPage />} />
        <Route path='/auth/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App;