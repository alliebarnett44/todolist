import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4} from 'uuid'

const AddTask = ({ onAdd }) => {
  const[task, setTask] = useState('')
  const[day, setDay] = useState('')
  const[time, setTime] = useState('')
  const[reminder, setReminder] = useState(false)
  const[taskId, setTaskId] = useState('')
  const [id, setId] = useState('33')

  const value = '33'

  const onSubmit = (e) => {
    e.preventDefault()
    if(!task) {
      alert('Please Add A Task')
      return
    } else {
      onAdd({task, day, time, taskId, id});
      setTask('');
      setDay('');
      setTime('');
      setTaskId(uuidv4());
      setId(id)
    }
    console.log(taskId)
    console.log(id)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input type='text' placeholder='Add New Task' value={task} onChange={(e) => setTask(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Date</label>
        <input type='text' placeholder='Add Time' value={day} onChange={(e) => setDay(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label>Time</label>
        <input tyle='text' placeholder='Add Time' value={time} onChange={(e) => setTime(e.target.value)}/>
      </div>
      <div className='form-control form-control-check'>
        <label>Priority</label>
        <input 
          type='checkbox' 
          value={reminder} 
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>

      <input className='btn btn-block' type='submit' value='Save Task'/>
    </form>
  )
}

export default AddTask
