import { FaTimes } from 'react-icons/fa'
import EditTask from './EditTask'
import {useState} from 'react'

const Task = ({task, onDelete, onToggle, onEdit}) => {
  // console.log(task)
  // console.log(task.taskId)
  // console.log(onEdit)
  // const [taskId, setTaskId] = useState([])

  // setTaskId(task.taskId)
  // console.log(taskId)

  return (
    <div className={`task ${task.reminder ? 'reminder' : ""}`} onDoubleClick={() => onToggle(task.id)}>
      <h2>
        {task.task} 
        <FaTimes style={{color: 'green', cursor: 'pointer'}} onClick={ () => onDelete(task.taskId)}/>
      </h2>
      <p>
        {task.day}
        <br></br>
        {task.time}
      </p>
      <EditTask task={task} onEdit={onEdit} taskId={task.taskId}/>
    </div>
  )
}

export default Task
