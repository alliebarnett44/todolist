import React from 'react'
import DeleteTask from './DeleteTask'
import Modal from 'react-modal'
import { useState } from 'react'

const Done = ({ tasks, onDelete }) => {
  // {tasks.map((task) => (
  //   <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit}/>
  //   ))}
  return(
  <>
    <h1>Completed Tasks</h1>
    <div>
      {tasks.map(task => { if (task.done == true){
        return (   
          <div>
            <h2> 
              {task.task}
              <DeleteTask onDelete = {onDelete} task={task}/>
            </h2>
            <p>{task.day}</p>
            <p>{task.time}</p>
          </div>
        )}
    }) 
    } 
    </div> 
  </>
  );
}
  

export default Done


