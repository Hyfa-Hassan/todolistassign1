import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import Createtodoform from './Createtodoform';
import CreateAddItems from './CreateAddItems';
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInp, setTaskInp] = useState("")
  const [fetchError,setFetchError] = useState(null);
  const handleChange = (e) => {
    // console.log(e.target.value)
    setTaskInp(e.target.value) /// stores the value of current input value to taskInp
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(taskInp)
    if (!taskInp) return; // if there is nothing in inputbox
    addTask(taskInp)
  }
  const addTask = (todo) => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1
    const newTaskItem = {
      id, completed: false, todo   //because key and value property , both are same
    }
    const newTaskList = [...tasks, newTaskItem]//copies all the items from oriinal array and adds them in new array
    setTasks(newTaskList)
    setTaskInp("")
    saveTask(newTaskItem);
  }
  const handleDelete = (id) => {
    const newTaskList = tasks.filter((task) => {
      return task.id !== id   //returns the elements having id!===id
    })
    setTasks(newTaskList)
    deleteTask(id)
  }
  const handleDoubleClick = (id) => {
    const newTaskList = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task, completed: !task.completed  //toggle the completed i.e: make strike on intems and reverse
        }
      }
      else {
        return task
      }
    });
    setTasks(newTaskList)
    const updatedTask = newTaskList.filter((task)=>task.id===id)
    updateStatus(id,updatedTask[0].completed) //array of unique id that we have to update
  };

  // read data(get data from database)
  const fetchTasks = async ()=>{
    try{
      const response = await fetch("http://localhost:4000/tasks")
      const taskItems = await response.json() //converts data into json form
      console.log(taskItems)
      setTasks(taskItems)
      setFetchError(null) // again set the error to null if there was an error and that has been solved
    } catch (error) {
      console.log(error)
      setFetchError(error.message)
    }
  }

  // create data
  const saveTask = async (task)=>{
    const postOptions = {
      method:"POST", // method is post here
      headers: {
        'Content-Type':'application/json'  //we are using http protocols therefore we have to give headers so that the server knows what kinda data we are sending(here we are sending the json data)
      },
      body:JSON.stringify(task) //make task in stringify form
    }
    const response = await fetch("http://localhost:4000/tasks",postOptions)
    console.log(response)
  }

  // update data
  const updateStatus = async (id,completed)=>{
    const updateOptions = {
      method:"PATCH",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({completed})
    }
    const response = await fetch(`http://localhost:4000/tasks/${id}`,updateOptions)
    console.log(response)
  }

  //delete data
  const deleteTask =async (id)=>{
    const deleteOption ={
      method:'DELETE'
    }
    const response = await fetch(`http://localhost:4000/tasks/${id}`,deleteOption)
    console.log(response)
  }

  useEffect(()=>{  ///executes at least once when the component renders
    console.log("called");
    fetchTasks()
  },[])
  return (
    <div className='to-do-app'>
      <h1>ToDo List</h1>
      <Createtodoform handleSubmit={handleSubmit} handleChange={handleChange} taskInp={taskInp}/>
      {/* if the fetchError is null means there is an error and  print the error message*/}
      {fetchError && <p>{fetchError}</p>} 
      {!fetchError && 
        <CreateAddItems tasks={tasks} handleDoubleClick={handleDoubleClick} handleDelete={handleDelete}/>
      }
    </div>
  )
}
export default App;
