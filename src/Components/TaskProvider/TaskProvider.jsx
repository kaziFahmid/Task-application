import React, { createContext,  useState } from 'react';
import Swal from 'sweetalert2';




export const TaskContext = createContext(null);

// Step 2: Create a TaskProvider component
export const TaskProvider = ({ children }) => {


  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
console.log(tasks)
  // Step 4: Define functions to update the task state
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };



  const handleAccept = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "inprogress";
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };


  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "completed";
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };


  const removeTask = (taskId) => {
  
    const updatedTasks = tasks.filter((task,index) => index !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: ' Task Removed',
        showConfirmButton: false,
        timer: 1500
      })
  };

 
  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask,handleAccept,handleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};


