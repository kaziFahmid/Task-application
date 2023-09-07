import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../TaskProvider/TaskProvider";
import useAuth from "../hooks/useAuth/useAuth";
import { Link } from "react-router-dom";
import { RiPassPendingFill} from 'react-icons/ri';
import { GiProgression} from 'react-icons/gi';
import { MdDone} from 'react-icons/md';

const Home = () => {
  const{ tasks, addTask, removeTask,handleAccept,handleComplete }=useContext(TaskContext)
  console.log(tasks)
   const{user}=useAuth()
   const[userList,setUserList]=useState(JSON.parse(localStorage.getItem('users')))
  return (
    <>
      <section className="grid h-[480px]   overflow-y-auto  overflow-x-auto gap-9 max-w-5xl mt-7 mx-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {/* pending*/}
        <div>
          <div className="flex justify-between items-center">
          <h1 className="font-semibold text-yellow-500 mb-4 gap-2 flex justify-between items-center "> <RiPassPendingFill className="text-3xl"/><span>Pending</span> </h1>
      <div className="bg-yellow-500 border-yellow-600 border-2 px-3 py-2  ">
         <span className="text-yellow-800">{tasks?.filter((x)=>x?.status==='pending').length}</span>
          </div>
          </div>

          <div className="flex justify-center flex-col items-start">
            {tasks?.filter((x)=>x?.status==='pending')?.map((task,index)=><div key={index} className=" w-full bg-base-100 shadow-xl px-4 py-4 mt-4">
              <div>
                <h2 className="card-title flex justify-between items-center">
                  <span>{task?.title}</span> {!user?<Link to='/login'><button className="btn">:</button></Link>:<details className="dropdown dropdown-end">
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
                <div>
                  
                  
                <div className="avatar">
  <div className="w-10 rounded-full">
  <img src={userList.find((x)=>x.name===task?.assignTask).photo
}/>
  </div>
</div>
                  
                  
                  
                  
                  
                  
                  
                 </div>
                 
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
   <div className="flex justify-between items-center">
   <h1 className="font-semibold text-yellow-700 mb-4 gap-2 flex justify-between items-center">< GiProgression className="text-3xl"/><span>In Progress</span></h1>
   <div className="bg-yellow-600 border-yellow-300 border-2 px-3 py-2  ">
        <span className=" text-yellow-300">   {tasks?.filter((x)=>x?.status==='inprogress').length}</span>
          </div>
   </div>

          {tasks?.filter((x)=>x?.status==='inprogress')?.map((task,index)=><div key={index} 
          className="  w-full bg-base-100 shadow-xl px-4 py-4 mt-4">
            
              <div>
                <h2 className="card-title flex justify-between items-center">
                  <span>{task?.title}</span> {!user?<Link to='/login'><button className="btn">:</button></Link>:<details className="dropdown dropdown-end">
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
          <div className="flex justify-between items-center">
          <h1 className="font-semibold text-green-500 mb-4 flex justify-center items-center gap-2"><MdDone className="text-3xl"/> <span>Completed</span> </h1>
          <div className="bg-green-500 border-green-600 border-2 px-3 py-2 text-white  ">
           {tasks?.filter((x)=>x?.status==='completed').length}
          </div>
          </div>
          


          {tasks?.filter((x)=>x?.status==='completed')?.map((task,index)=><div key={index}   className="  w-full bg-base-100 shadow-xl px-4 py-4 mt-4">
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
