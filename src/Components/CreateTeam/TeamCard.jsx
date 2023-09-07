import React, { useContext, useState } from 'react'

import {FaTrashAlt} from 'react-icons/fa';
import { TaskContext } from '../TaskProvider/TaskProvider';
import useAuth from '../hooks/useAuth/useAuth';
const TeamCard = ({teamName, teamTaskDesc,selectedMembers,teamTaskName,status,index,ownerEmail}) => {
    const{ handleTeamTaskComplete, tasks,teamTasks, addTask, removeTask,handleAccept,handleComplete,addTeamTask,removeTeamTask }=useContext(TaskContext)
    const{user}=useAuth()
    const [userList, setUserList] = useState(JSON.parse(localStorage.getItem('users')));
    const matchingUserObjects = userList.filter(user => selectedMembers.includes(user.name));
  
    return (
    <div className='bg-white shadow-sm w-full px-6 py-6 rounded-lg mt-5'>
   
      <div className='flex justify-between items-center'>
       <div >
       <h1 className='text-center text-black font-semibold mb-4'>{teamName}</h1>
        <div className='text-black'>
          <h1 className='font-semibold'> {teamTaskName}</h1>
        </div>
       </div>
{user?.email&&   <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
<button className='btn bg-green-500 text-white ' disabled={matchingUserObjects?.some((x)=>x?.name===user?.displayName)} onClick={()=>handleTeamTaskComplete(index)}>Complete</button>
<button disabled={matchingUserObjects?.some((x)=>x?.name===user?.displayName)} className='btn bg-red-500 text-white'><FaTrashAlt className='text-lg 'onClick={()=>removeTeamTask(index)}/></button>
</div>}
      </div>
<div className='mt-4'>
  <h6 className='text-black font-semibold mb-2'>Description</h6>
  <p className='text-justify'>{teamTaskDesc}</p>
</div>
<div className='flex justify-between items-center mt-10'>
  <div>


  <div className="avatar-group -space-x-6">
  {matchingUserObjects?.map((x)=><div className="avatar">
    <div className="w-12">
      <img src={x?.photo} />
    </div>
  </div>
  )}
</div>

  








  </div>
  <div>
<p className={`${status==='Completed'&&'text-green-500'||status==='Inprogress'&&'text-yellow-600'}`}>
  {status}
</p>
</div>

</div>

        </div>
  )
}

export default TeamCard
