import Task from './Task'


const Tasks = ({ tasks, onDelete, onToggle, onEdit }) => {
  console.log(tasks)

  if (tasks == undefined) {
    return(
      <div>
        New Profile
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