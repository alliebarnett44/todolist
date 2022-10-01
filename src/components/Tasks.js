import Task from './Task'
import Done from './Done'
import Modal from 'react-modal'
import { useState } from 'react'


const Tasks = ({ tasks, onDelete, onToggle, onEdit, onDone }) => {
  console.log(onDone)
  const [show, setShow] = useState(false);

  const handleShow = () => {setShow(true)};
  const handleClose = () => {
    setShow(false);
  };


  if (tasks.length === 0) {
    return(
      <div>
        Welcome! Get started by adding a task!
      </div>
    )
  } else {

  return (
  <>
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} onDone={onDone}/>
        ))}
    </div>
    <button className='btn' style={{fontSize: '12px', background: 'black', cursor: 'pointer', padding: '3px 5px', margin: '0px'}} onClick={handleShow}>Completed Tasks</button>
    <Modal isOpen={show} style={{width: '50%'}} >
        <Done tasks={tasks} onDelete={onDelete}/>
        <button className='btn btn-block' onClick={handleClose} type='button'>Close</button>
    </Modal>
  </>
  )
  }
}
export default Tasks