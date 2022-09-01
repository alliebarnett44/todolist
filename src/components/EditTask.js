import React from 'react'
import { FaPen } from 'react-icons/fa'
import Modal from 'react-modal'
import { useState } from 'react'

Modal.setAppElement('#root');

const EditTask = (task) => {

  const [show, setShow] = useState(false);
  const [editTask, setEditTask] = useState(task.task.task);
  const [editTaskDay, setEditTaskDay] = useState(task.task.day);
  const [editTaskTime, setEditTaskTime] = useState(task.task.time)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getNewTask = () => {
    task.task.task = editTask;
    task.task.day = editTaskDay;
    task.task.time = editTaskTime;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getNewTask(); 
    setEditTask('');
    setEditTaskDay('');
    setEditTaskTime('');
    console.log('submitted');
  }

  return (
    <div>
      <button className='btn' style={{fontSize: '12px', background: 'gray', cursor: 'pointer', padding: '3px 5px', margin: '0px'}} onClick={handleShow}>Edit Task</button>
      <Modal isOpen={show} style={{width: '50%'}} className='container'>
      <div className='form-control'>
        <form className='add-form'onSubmit={handleSubmit}>
            <h3>
              Edit your Task
            </h3>
            <p>
              <input className='form-control' type='text' name='task'  placeholder={task.task.task} value={editTask} onChange={(e) => setEditTask(e.target.value)}></input>
              <input className='form-control' type='text' name='day' placeholder={task.task.day} value={editTaskDay} onChange={(e) => setEditTaskDay(e.target.value)}></input>
              <input className='form-contol' type='text' name='time' placeholder={task.task.time} value={editTaskTime} onChange={(e) => setEditTaskTime(e.target.value)}></input>
              <button className='btn btn-block' type='submit'>Add</button>
              <button className='btn btn-block' onClick={handleClose} type='button'>Close</button>
            </p>
        </form>
      </div>
      </Modal>
    </div>
  )
}

export default EditTask


