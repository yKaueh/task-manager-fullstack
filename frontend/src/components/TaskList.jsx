import TaskItem from './TaskItem'

const TaskList = ({ tasks, onDelete, editingTaskId, onStartEdit, onSaveEdit, onCancelEdit, onToggleTaskStatus }) => {

  return (
      <section className="task-list-section">
        <div className="task-list__header">
          <h2>Tarefas</h2>
        </div>
        <ul className='tasks'>
           {tasks.map(task => (
              <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              editingTaskId={editingTaskId}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onToggleTaskStatus={onToggleTaskStatus}
              />
           ))}
        </ul>
      </section>
  )
}

export default TaskList