import React, { useContext, useState } from 'react'
import { TaskContext } from '../TaskProvider/TaskProvider';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  const[userList,setUserList]=useState(JSON.parse(localStorage.getItem('users'))||[])
  const { tasks, addTask,teamTasks, removeTask, handleAccept, handleComplete } =
    useContext(TaskContext);
  
 const data=[
  {
    pending:tasks.filter((x)=>x.status==='pending').length,
    inprogress:tasks.filter((x)=>x.status==='inprogress').length,
    completed:tasks.filter((x)=>x.status==='completed').length
  }
 ]
    
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
      
      <div className=' mt-8'>
      <ResponsiveContainer className='mx-auto'  width='80%' height={300}>
      <BarChart  data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="pending" fill="#8884d8" />
  <Bar dataKey="inprogress" fill="#FCD12A" />
  <Bar dataKey="completed" fill="#82ca9d" />
</BarChart>
      </ResponsiveContainer>                  

      </div>
    </section>
  )
}

export default Dashboard
