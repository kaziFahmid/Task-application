import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../TaskProvider/TaskProvider";
import useAuth from "../hooks/useAuth/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const{ tasks, addTask, removeTask,handleAccept,handleComplete }=useContext(TaskContext)
   const{user}=useAuth()
   console.log(user)
  return (
    <>
      <section className="grid h-[480px]   overflow-y-auto  overflow-x-auto gap-9 max-w-5xl mt-7 mx-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {/* pending*/}
        <div>
          <h1 className="font-semibold text-yellow-500 mb-4 ">Pending</h1>

          <div className="flex justify-center flex-col items-start">
            {tasks?.filter((x)=>x?.status==='pending')?.map((task,index)=><div key={index} className="card w-full bg-base-100 shadow-xl px-6 py-6 mt-4">
              <div>
                <h2 className="card-title flex justify-between items-center">
                  <span>{task?.title}</span> {!user?<Link to='/login'><button className="btn">:</button></Link>:<details className="dropdown ">
  <summary className="m-1 btn">:</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li>{task?.assignTask===user?.displayName?<a onClick={()=>handleAccept(index)} >Accept</a>:<a onClick={()=>removeTask(index)}>Delete</a>}</li>
  
  </ul>
</details>}
                </h2>
                <p className="mt-2">
                 {task?.description}
                </p>
                <div className="flex mt-5 justify-between items-center">
                <div>{task?.assignTask}</div>
                 
                  <div>{task?.dueDate}</div>
                  <div  className={task?.priority==='medium'&&'text-yellow-500'|| task?.priority==='high'&&'text-red-500'|| task?.priority==='low'&&'text-green-500'}>{task?.priority}</div>
                </div>
              </div>
            </div>
)}
            
            
            
            
            
            
          











          </div>
        </div>
        {/* In Progress */}
        <div>
          <h1 className="font-semibold text-yellow-700 mb-4">In Progress</h1>

          {tasks?.filter((x)=>x?.status==='inprogress')?.map((task,index)=><div key={index} 
          className="card w-full bg-base-100 shadow-xl px-6 py-6 mt-4">
            
              <div>
                <h2 className="card-title flex justify-between items-center">
                  <span>{task?.title}</span> {!user?<Link to='/login'><button className="btn">:</button></Link>:<details className="dropdown ">
  <summary className="m-1 btn">:</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li>{task?.assignTask===user?.displayName?<a  onClick={()=>handleComplete(index)}>Complete</a>:<a onClick={()=>removeTask(index)}>Delete</a>}</li>
  
  </ul>
</details>}
                </h2>
                <p className="mt-2">
                 {task?.description}
                </p>
                <div className="flex mt-5 justify-between items-center">
                <div>{task?.assignTask}</div>
                 
                  <div>{task?.dueDate}</div>
                  <div  className={task?.priority==='medium'&&'text-yellow-500'|| task?.priority==='high'&&'text-red-500'|| task?.priority==='low'&&'text-green-500'}>{task?.priority}</div>
                </div>
              </div>
            </div>
)}
         
          
         
        </div>
        {/*  Completed */}
        <div>
          <h1 className="font-semibold text-green-500 mb-4"> Completed </h1>
          


          {tasks?.filter((x)=>x?.status==='completed')?.map((task,index)=><div key={index} className="card w-full bg-base-100 shadow-xl px-6 py-6 mt-4">
              <div>
                <h2 className="card-title flex justify-between items-center">
                  <span>{task?.title}</span>
                  {user?.email === task?.ownerEmail && (
          <button
            onClick={() => removeTask(index)}
            className="text-white btn bg-red-500"
          >
            Remove
          </button>
        )}
                </h2>
                <p className="mt-2">
                 {task?.description}
                </p>
                <div className="flex mt-5 justify-between items-center">
                <div>{task?.assignTask}</div>
                 
                  <div>{task?.dueDate}</div>
                  <div  className={task?.priority==='medium'&&'text-yellow-500'|| task?.priority==='high'&&'text-red-500'|| task?.priority==='low'&&'text-green-500'}>{task?.priority}</div>
                </div>
              </div>
            </div>
)}















        </div>
      </section>
    </>
  );
};

export default Home;
