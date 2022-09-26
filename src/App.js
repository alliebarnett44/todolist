import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Homepage from './components/Homepage'
import SignUp from './components/SignUp'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAccordionButton } from 'react-bootstrap'
import Login from './components/Login'

function App() {
  const[showAddTask, setShowAddTask] = useState(false)
  const[showLogin, setShowLogin] = useState(false)
  const[showCreate, setShowCreate] = useState(false)
  const [tasks, setTasks] = useState([])
  const [userId, setUserId] = useState([])
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  console.log(userId)

  //Fetch Tasks from Server/Backend
  const fetchTasks = async (userId) => {
    console.log(userId)
    const res = await fetch(`https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items/${userId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'accept': '*/*'
      },
    })
    const data = await res.json()
    console.log(data)
    const tasks = data.Item.task;
    const id = data.Item.id
    console.log(tasks)
   
    
    // // console.log(task)
    setTasks(tasks);
    setUserId(id);
    return tasks
  }

  const validateUser = async(info) => {
    console.log(info.email)
    console.log(info.password)

    const res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/validate', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'accept': '*/*'
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password
      })
    })
    const data = await res.json();
    console.log(data.Items)
    const userInfo = data.Items
    
    if(userInfo.length !== 0) {
      console.log('navigating to profile');
      navigate("/profile")
      // navigate("/profile", { state: { id: userId} } );
    } else if(userInfo.length == 0) {
      console.log('new user')
    }
    else {
      alert('Incorrect email/password')
    }
    const validatedUserId = userInfo[0].id
    console.log(validatedUserId)
    setUserId(validatedUserId)
    fetchTasks(validatedUserId);

  }

  //Fetch one Task
  const fetchTask = async(id) => {
    const res = await fetch(`https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items/${id}`)
    const data = await res.json()
  }
  
  //Create User
  const createUser = async(info) => {
    const res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "accept": "*/*"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        id: uuidv4(),
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        password: info.password,
        task: []
      }),
    })
    const data = await res.json();
    console.log(data);
    navigate("/profile")
    fetchTasks(userId)
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
        taskId: task.taskId,
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

  //Log Out
  const logOut = () => {
    navigate("/")
  }


  // useEffect(() => {
  //   fetchTasks();
  // },[setTasks])

  // console.log(editTask)

  return (
    <div className='container'>
      
      <Routes>
      <Route path='/' element={
        <>
        <Homepage 
          onShow={()=> setShowLogin(!showLogin)} 
          onShowCreate={() => setShowCreate(!showCreate)}
          showLoginButton={showLogin}
          showCreateButton={showCreate}/>
        {showLogin && <Login validateUser={validateUser}/>}
        {showCreate && <SignUp createUser={createUser}/>}
        </>
        }
      />
      <Route path='/profile' element={
        <>
        <Header
          onAdd ={()=>setShowAddTask(!showAddTask)} 
          showAdd ={showAddTask}
          onLogOut = {logOut} />
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
  )
}

export default App;
