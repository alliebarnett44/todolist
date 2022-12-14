import React from 'react'
import { FaPen } from 'react-icons/fa'
import Modal from 'react-modal'
import { useState } from 'react'

Modal.setAppElement('#root');

const EditTask = ({ task, onEdit, taskId }) => {
  // console.log(task.onEdit);
  // console.log(task.task);
  // console.log(task.taskId);
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState(task.task);
  const [newDay, setNewDay] = useState(task.day);
  const [newTime, setNewTime] = useState(task.time);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getNewTask = () => {
    task.task.task = newTask;
    task.task.day = newDay;
    task.task.time = newTime;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({newTask, newDay, newTime, taskId}); 
    setNewTask(newTask);
    setNewDay(newDay);
    setNewTime(newTime);
    handleClose();
    console.log('submitted');
  }

  return (
    <div>
      <button className='btn' style={{fontSize: '12px', background: 'gray', cursor: 'pointer', padding: '3px 5px', margin: '0px'}} onClick={handleShow}>Edit Task</button>
      <Modal isOpen={show} style={{width: '50%'}} >
      <div className='form-control'>
        <form className='add-form'onSubmit={handleSubmit}>
            <h3>
              Edit your Task
            </h3>
            <p>
              <input className='form-control' type='text' name='task'  placeholder={task.task} value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>
              <input className='form-control' type='text' name='day' placeholder={task.day} value={newDay} onChange={(e) => setNewDay(e.target.value)}></input>
              <input className='form-contol' type='text' name='time' placeholder={task.time} value={newTime} onChange={(e) => setNewTime(e.target.value)}></input>
              <button className='btn btn-block' type='submit'>Edit</button>
              <button className='btn btn-block' onClick={handleClose} type='button'>Close</button>
            </p>
        </form>
      </div>
      </Modal>
    </div>
  )
}

export default EditTask


