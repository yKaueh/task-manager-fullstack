import { useEffect, useRef, useState } from "react"
import { Circle, CheckCircle2 } from 'lucide-react'
import './TaskItem.css'

const TaskItem = ({ task, onDelete, editingTaskId, onStartEdit, onSaveEdit, onCancelEdit, onToggleTaskStatus }) => {
  const isEditing = editingTaskId === task.id
  const [editInput, setEditInput] = useState('')
  const inputRef = useRef(null)

  const adjustTextHeight = (el) => {
    // Auto resize pra evitar virar scroll enquanto edita para texto maior
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  useEffect(() => {
    if(isEditing && inputRef.current){
      const el = inputRef.current
      el.focus()
      // Após focar, colocar o cursor no final do texto
      const len = el.value.length
      el.setSelectionRange(len, len)
      adjustTextHeight(el)
    }
  }, [isEditing])

  return (
    <li className={`task ${task.status === 'done' ? 'done' : ''}`}>
        <span className="task-status"
        onClick={() => onToggleTaskStatus(task.id)}
        >
          {
            task.status === 'pending' ? <Circle size={18} />
            : <CheckCircle2 size={18} />
          }
          
        </span>
        <div className="task-content">
          {isEditing
          ? <textarea className="input input-edit"
            value={editInput}
            onChange={(e) => {
              setEditInput(e.target.value)
              adjustTextHeight(e.target)
            }}
            ref={inputRef}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !e.shiftKey){
                e.preventDefault()
                if(!editInput.trim()) return
                if(editInput.trim() === task.title.trim()) return
                onSaveEdit(task.id, editInput.trim())
              }
              if(e.key === 'Escape'){
                onCancelEdit()
              }
            }}
          />
          : <h3 className="task-title">{task.title}</h3>
          }
        </div>
        <div className="task-controls">
          <button className={`btn ${isEditing ? 'btn-success btn-save' : 'btn-secondary btn-edit'}`}
          onClick={() => {
            if(isEditing){
              if(!editInput.trim()) return
              if(editInput.trim() === task.title.trim()) return
              onSaveEdit(task.id, editInput.trim())
            }else{
              onStartEdit(task.id)
              setEditInput(task.title)
            }
          }}
          >
            {isEditing
            ? 'Salvar'
            : 'Editar'}
          </button>
          {!isEditing &&
          <button className="btn btn-danger btn-delete"
          onClick={() => onDelete(task.id)}
          >Deletar</button>}
          {isEditing &&
          <button className="btn btn-ghost btn-cancel"
          onClick={() => onCancelEdit()}
          >Cancelar</button>}
        </div>

    </li>
  )
}

export default TaskItem