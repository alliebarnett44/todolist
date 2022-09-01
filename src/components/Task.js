import { FaTimes } from 'react-icons/fa'
import EditTask from './EditTask'

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ""}`} onDoubleClick={() => onToggle(task.id)}>
      <h2>
        {task.task} 
        <FaTimes style={{color: 'green', cursor: 'pointer'}} onClick={ () => onDelete(task.id)}/>
      </h2>
      <p>
        {task.day}
        <br></br>
        {task.time}
        <EditTask task={task}/>
      </p>
    </div>
  )
}

export default Task
