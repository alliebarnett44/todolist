import Task from './Task'


const Tasks = ({ tasks, onDelete, onToggle, onEdit }) => {
  // console.log(tasks)

  if (tasks.length === 0) {
    return(
      <div>
        Welcome! Get started by adding a task!
      </div>
    )
  } else {

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit}/>
        ))}
    </div>
  )
  }
}
export default Tasks