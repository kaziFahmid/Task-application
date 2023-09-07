import React, { createContext,  useState } from 'react';
import Swal from 'sweetalert2';




export const TaskContext = createContext(null);

// Step 2: Create a TaskProvider component
export const TaskProvider = ({ children }) => {


  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [teamTasks, setTeamTasks] = useState(JSON.parse(localStorage.getItem('teamtasks')) || []);
  const [taskIdCounter, setTaskIdCounter] = useState(1); // Counter for task ids

  const addTask = (task) => {
    // Check if a task with the same title already exists
    const taskExists = tasks.some((existingTask) => existingTask.title === task.title);

    if (!taskExists) {
      // Create a new task object with an id and increment the counter
      const newTask = { ...task, id: taskIdCounter };
      setTaskIdCounter(taskIdCounter + 1);

      // Add the new task to the tasks array
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // Show a success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task successfully added!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // If a task with the same title already exists, show an error message
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Task Title',
        text: 'A task with the same title already exists.',
      });
    }
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



  const handleAccept = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'inprogress' } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  
  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const handleTeamTaskComplete = (index) => {
    const updatedTasks = [...teamTasks];
    updatedTasks[index].status = 'Completed';
    setTeamTasks(updatedTasks);
    localStorage.setItem('teamtasks', JSON.stringify(updatedTasks));
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
    <TaskContext.Provider value={{ tasks,teamTasks, handleTeamTaskComplete, addTask, removeTask,handleAccept,handleComplete,addTeamTask,removeTeamTask }}>
      {children}
    </TaskContext.Provider>
  );
};


