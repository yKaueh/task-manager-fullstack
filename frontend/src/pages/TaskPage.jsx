import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskControlsBar from '../components/TaskControlsBar'
import TaskList from '../components/TaskList'
import { getTasks, createTask, deleteTask, updateTask, toggleTaskStatus } from '../services/tasksService'
import './tasks.css'
import './auth.css'

const TaskPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tasks, setTasks] = useState([])
  const [editingTaskId, setEditingTask] = useState(null)

  const navigate = useNavigate()

  const onCreate = async (title) => {
    try {
      const token = localStorage.getItem('token')

      const data = await createTask(token, title)

      setTasks(prev => sortTasks([...prev, data]))
    } catch (error) {
      setError(error.message)
    }
  }

  const onDelete = async (id) => {
    try {      
      const token = localStorage.getItem('token')
      await deleteTask(token, id)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      setError(error.message)
    }
  }

  const onStartEdit = (id) => {
    setEditingTask(id)
  }
  const onCancelEdit = () => {
    setEditingTask(null)
  }
  const onSaveEdit = async (id, title) => {
    try{
      const token = localStorage.getItem('token')
      await updateTask(token, id, title)
      setTasks(prev => prev.map(task => (
        task.id === id
        ? {...task, title}
        : task
      )))
    } catch (error) {
      setError(error.message)
    } finally {
      setEditingTask(null)
    }
  }

  const onToggleTaskStatus = async (id) => {
    try {
        const token = localStorage.getItem('token')
        const data = await toggleTaskStatus(token, id)
        setTasks(prev => sortTasks(prev.map(task => (
          task.id === id
          ? { ...task, status: data.status }
          : task
        ))))   
    } catch (error) {
      setError(error.message)
    }

  }

  const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.status === b.status) return 0
    return a.status === 'pending' ? -1 : 1
  })
  }

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('token')

        if(!token){
          navigate("/auth/login")
        }
        const data = await getTasks(token)
        setTasks(sortTasks(data))
      } catch (error) {
        setError(error.message)
      } finally{
        setLoading(false)
      }
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(loading){return <p>Carregando...</p>}
  if(error){return <p>Erro: {error}</p>}

  return (
    <main>
      <TaskControlsBar 
      onCreate={onCreate}
      />
      <TaskList
      tasks={tasks}
      onDelete={onDelete}
      editingTaskId={editingTaskId}
      onStartEdit={onStartEdit}
      onSaveEdit={onSaveEdit}
      onCancelEdit={onCancelEdit}
      onToggleTaskStatus={onToggleTaskStatus}
      />
    </main>
  )
}

export default TaskPage;