import { FaTimes } from 'react-icons/fa'
import EditTask from './EditTask'
import DeleteTask from './DeleteTask'
import { FaCheck } from 'react-icons/fa'
import Button from './Button'
import {useState} from 'react'

const Task = ({task, onDelete, onToggle, onEdit}) => {
  // console.log(task)
  // console.log(task.taskId)
  // console.log(onEdit)
  // const [taskId, setTaskId] = useState([])

  // setTaskId(task.taskId)
  // console.log(taskId)
  const [done, setDone] = useState(false)
  const [showText, setShowText] = useState(false)

  const handleClick = () => {
    setDone(!done)
  }
  console.log(done)

  return (
    <div className={`task ${task.reminder ? 'reminder' : ""}`} style={{opacity:done ? 0.3 : 1.0}} onDoubleClick={() => onToggle(task)}>
      <h2>
        {task.task} 
        <DeleteTask onDelete = {onDelete} task={task}/>
      </h2>
      <h3>
        {task.day}
        <FaCheck style={{color: 'green', cursor: 'pointer'}} onClick={handleClick}/>
      </h3>
      <p>
        {task.time} 
      </p>
      
      <EditTask task={task} onEdit={onEdit} taskId={task.taskId}/>
      
    </div>
  )
}

export default Task
