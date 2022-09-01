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
 
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    
    getTasks()
  }, [])

  //Fetch Tasks from Server/Backend
  const fetchTasks = async() => {
    const res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items', {
      headers: {
        'accept': 'application/json',
        'Accept': '*/*'
      },
    })
    const data = await res.json()

    return data
  }

  //Fetch one Task
  const fetchTask = async(id) => {
    const res = await fetch(`https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('https://m8k9cw5snc.execute-api.us-east-1.amazonaws.com/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*"
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
        {tasks.length > 0 ? (
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
