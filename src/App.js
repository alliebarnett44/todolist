import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAccordionButton } from 'react-bootstrap'

function App() {
  const[showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [userId, setUserId] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);


  //Fetch Tasks from Server/Backend
  const fetchTasks = async () => {
    const res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'accept': '*/*'
      },
    })
    const data = await res.json()
    const tasks = data.Items[0];
    // console.log(tasks)
    // console.log(tasks.task)
    // console.log(tasks.id)
    const task = tasks.task
    // console.log(task)
    setTasks(task);
    setUserId(tasks.id)
    return tasks
  }

  //Fetch one Task
  const fetchTask = async(id) => {
    const res = await fetch(`https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items/${id}`)
    const data = await res.json()
  }
  
  //Add Task
  const addTask = async (task) => {
    console.log(task)
    const res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "accept": "*/*"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        id: userId,
        taskId: uuidv4(),
        task: task.task,
        time: task.time,
        day: task.day
      }),
    })
    const data = await res.json();
    console.log(data);

    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {id, ...task}
    setTasks([data]);
    fetchTasks(userId);
  }

  //Edit Task 
  const editTask = async (task) => {
    console.log(task);
    let res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/edittask', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify({
        id: userId,
        taskId: task.newTaskId,
        newTask: task.newTask,
        newDay: task.newDay,
        newTime: task.newTime,
      })
    })
    const data = await res.json();
    console.log(data);
    setTasks([data])
    fetchTasks(userId);
  }
 
   //Delete Task
  const deleteTask = async (taskId) => {
    const res = await fetch(`https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "accept": "*/*"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        id: userId,
        taskId
      })
    }) 
    const data = await res.json()
    const newTask = data.Attributes.task

    console.log(newTask)
    setTasks([newTask])
    console.log(tasks)
    fetchTasks(userId);
    handleClose();
  }

  //Toggle Reminder 
  const toggleReminder = async (id) => {
    // const taskToToggle = await fetchTask(id)
    // const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    // const res = await fetch(`http://localhost:6060/tasks/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(updTask),
    // })

    // const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  useEffect(() => {
    // const getTasks = async () => {
    //   const tasksFromServer = await fetchTasks()
    //   console.log(tasksFromServer)
    //   setTasks(tasksFromServer)
    // }
    console.log(tasks)
    fetchTasks()
    console.log(tasks)
    // console.log(tasks.length)
    // console.log(tasks)
  },[setTasks])

  // console.log(editTask)

  return (
    <Router>
    <div className='container'>
      <Header
        onAdd ={()=>setShowAddTask(!showAddTask)} 
        showAdd ={showAddTask}/>
      <Routes>
      <Route path='/' element={
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks ? (
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} onEdit={editTask}/>
        ) : ('No Tasks to Show')
        }
      </>
      }
      />
      <Route path='/about' element={<About />} />
      </Routes>  
    <Footer/>
    </div>
    </Router>

  )
}

export default App;
