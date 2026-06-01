import { useState } from "react";
import './CreateTask.css'

const CreateTask = ({ onCreate }) => {
  const [input, setInput] = useState("")

  const handleCreate = () => {
    if(!input.trim()) return setInput('')
    onCreate(input)
    setInput('')
  }

  return (
    <section className="create-task-section">
        <h2 className="create-task-title">Criar tarefa:</h2>
            <input type="text" name="create_task" id="create_task" className="input input-create-task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !e.shiftKey){
                handleCreate()
              }
            }}
            />
            <button className="btn btn-primary btn-create-task"
            onClick={handleCreate}
            >Criar</button>
    </section>
  )
}

export default CreateTask;