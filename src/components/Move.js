import React from 'react'
import { useState } from 'react'

const Move = ({ task, onDone }) => {

  const [done, setDone] = useState(true)

  const handleClick = (e) =>
  {
    e.preventDefault();
    onDone(task);
    setDone(false);
  }


  return (
    <div style={{opacity: done ? 1.0 : 0.3}}>
      <button className='btn' style={{fontSize: '12px', background: 'black', cursor: 'pointer', padding:'3px 5px', margin:'0px'}} onClick={handleClick}>Move to To-Do</button>
    </div>
  )
}

export default Move