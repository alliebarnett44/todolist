import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'

function App() {
  const[showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // useEffect(() => {
  
  //   fetchTasks()
  // }, [])

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
    console.log(tasks)
    console.log(tasks.task)
    console.log(tasks.id)
    const task = tasks.task
    console.log(task)
    setTasks(task)
    return tasks
  }

  //Fetch one Task
  const fetchTask = async(id) => {
    const res = await fetch(`https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items/${id}`)
    const data = await res.json()
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "accept": "*/*"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()

    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {id, ...task}
    setTasks([...tasks, data])
  }

  

  //Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items/${id}`, {
      method: 'DELETE',
    }) 
    // setTasks(tasks.filter((task) => task.id !== id))
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
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
  },[])

  return (
    // <div>
    //   Hello
    // </div>
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
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
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


    // <Router>
    //   <div className='container'>
    //     <Header
    //       onAdd={() => setShowAddTask(!showAddTask)}
    //       showAdd={showAddTask}
    //     />
    //     <Routes>
    //       <Route
    //         path='/'
    //         element={
    //           <>
    //             {showAddTask && <AddTask onAdd={addTask} />}
    //             {tasks.length > 0 ? (
    //               <Tasks
    //                 tasks={tasks}
    //                 onDelete={deleteTask}
    //                 onToggle={toggleReminder}
    //               />
    //             ) : (
    //               'No Tasks To Show'
    //             )}
    //           </>
    //         }
    //       />
    //       <Route path='/about' element={<About />} />
    //     </Routes>
    //     <Footer />
    //   </div>
    // </Router>
  )
}

export default App;
