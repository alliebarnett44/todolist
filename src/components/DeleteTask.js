import React from 'react'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'

{/* <FaTimes style={{color: 'green', cursor: 'pointer'}} onClick={ () => newOnDelete(newTaskId)}/> */}

Modal.setAppElement('#root');

const DeleteTask = (task, onDelete) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const newOnDelete = task.onDelete;
  const newTaskId = task.task.taskId;
  
  return (
    <div>
      <FaTimes style={{color: 'green', cursor: 'pointer'}} onClick={handleShow}/>
      <Modal isOpen={showModal} style={{width: '50%'}} className='container'>
      <div className='form-control' onSubmit={handleClose}>
          <h3>
            Are you sure you want to delete this task?
            <button className='btn btn-block' onClick={handleClose} type='submit'>No</button>
          <button className='btn btn-block' onClick={ () => newOnDelete(newTaskId)} type='submit'>Yes, I am sure.</button>
          </h3>
      </div>
      </Modal>
    </div>
  )
}

export default DeleteTask