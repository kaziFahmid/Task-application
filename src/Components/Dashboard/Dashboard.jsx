import React, { useContext, useState } from 'react'
import { TaskContext } from '../TaskProvider/TaskProvider';

const Dashboard = () => {
  const[userList,setUserList]=useState(JSON.parse(localStorage.getItem('users'))||[])
  const { tasks, addTask,teamTasks, removeTask, handleAccept, handleComplete } =
    useContext(TaskContext);
  
  return (
    <section>
      <div className="stats shadow  mt-6 flex lg:flex-row  flex-col justify-center items-center max-w-5xl mx-auto">
  
  <div className="stat md:place-items-start place-items-center">
    <div className="stat-title">Total Tasks</div>
    <div className="stat-value">{tasks.length}</div>
   
  </div>
  
  <div className="stat  md:place-items-start place-items-center">
    <div className="stat-title">Users</div>
    <div className="stat-value text-blue-500">{userList?.length}</div>

  </div>
  
  <div className="stat  md:place-items-start place-items-center">
    <div className="stat-title">Total Teams</div>
    <div className="stat-value">{teamTasks?.length}</div>

  </div>
  
</div>
      
    </section>
  )
}

export default Dashboard
