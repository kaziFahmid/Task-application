import React, { createContext,  useState } from 'react';
import Swal from 'sweetalert2';




export const TaskContext = createContext(null);

// Step 2: Create a TaskProvider component
export const TaskProvider = ({ children }) => {


  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [teamTasks, setTeamTasks] = useState(JSON.parse(localStorage.getItem('teamtasks')) || []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const addTeamTask = (task) => {
    const updatedTasks = [...teamTasks, task];
    setTeamTasks(updatedTasks);
    localStorage.setItem('teamtasks', JSON.stringify(updatedTasks));
  };

  const removeTeamTask = (taskId) => {
  
    const updatedTasks = teamTasks.filter((task,index) => index !== taskId);
    setTeamTasks(updatedTasks);
    localStorage.setItem('teamtasks', JSON.stringify(updatedTasks));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: ' Task Removed',
        showConfirmButton: false,
        timer: 1500
      })
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
    <TaskContext.Provider value={{ tasks,teamTasks, addTask, removeTask,handleAccept,handleComplete,addTeamTask,removeTeamTask }}>
      {children}
    </TaskContext.Provider>
  );
};


