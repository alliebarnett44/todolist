import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'
import EditTask from './EditTask'
import DeleteTask from './DeleteTask'
import { FaCheck } from 'react-icons/fa'
import Button from './Button'
import {useState} from 'react'

const Task = ({task, onDelete, onToggle, onEdit, onDone }) => {
  console.log(task.done)
  // console.log(task.taskId)
  // console.log(onEdit)
  // const [taskId, setTaskId] = useState([])

  // setTaskId(task.taskId)
  // console.log(taskId)
  const [done, setDone] = useState(false)
 


  const handleClick = () => {
    setDone(!done);
    onDone(task)
    console.log(task.done)
  }
  // console.log(done)


  if (task.done == false) {
    return (
    <>
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
      </>  
    )
  } else {
    return (
      null
    )
  }
}

export default Task

