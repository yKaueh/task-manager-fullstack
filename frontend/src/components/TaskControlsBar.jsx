import CreateTask from "./CreateTask"

const TasksControlsBar = ({ onCreate }) => {
  return (
    <section className="task-controls-bar">
        <CreateTask onCreate={onCreate}/>
    </section>
  )
}

export default TasksControlsBar