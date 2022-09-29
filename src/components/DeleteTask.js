import React from 'react'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'

{/* <FaTimes style={{color: 'green', cursor: 'pointer'}} onClick={ () => newOnDelete(newTaskId)}/> */}

Modal.setAppElement('#root');

const DeleteTask = ({ task, onDelete }) => {
  console.log(task.taskId)

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  
  return (
    <div>
      <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={handleShow}/>
      <Modal isOpen={showModal} style={{width: '50%', opacity: 1}} className='container'>
      <div className='form-control' onSubmit={handleClose}>
          <h3>
            Are you sure you want to delete this task?
            <button className='btn btn-block' onClick={handleClose} type='submit'>No</button>
            <button className='btn btn-block' onClick={ () => onDelete(task.taskId)} type='submit'>Yes, I am sure.</button>
          </h3>
      </div>
      </Modal>
    </div>
  )
}

export default DeleteTask