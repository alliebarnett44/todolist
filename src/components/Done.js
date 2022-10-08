import React from 'react'
import DeleteTask from './DeleteTask'
import Move from './Move'
import Modal from 'react-modal'
import { useState } from 'react'

const Done = ({ tasks, onDelete, onDone }) => {

  // const [done, setDone] = useState(true)

  // const handleClick = (e) =>
  // {
  //   e.preventDefault();
  //   onDone(task);
  //   setDone(false);
  // }
  
  return(
  <>
    <h1>Completed Tasks</h1>
    <div >
      {tasks.map(task => { if (task.done == true){
        return (   
          <div className='task'>
            <h2>
              {task.task} 
              <DeleteTask onDelete = {onDelete} task={task}/>
            </h2>
            <p>{task.day}</p>
            <p>{task.time}</p>
            <Move task={task} onDone={onDone}/>
          </div>
        )}
    }) 
    } 
    </div> 
  </>
  );
}
  

export default Done


