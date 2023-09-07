import React, { useContext, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import {FaTrashAlt} from 'react-icons/fa';
import { TaskContext } from '../TaskProvider/TaskProvider';
const TeamCard = ({teamName, teamTaskDesc,selectedMembers,teamTaskName,status,index}) => {
    const{ tasks,teamTasks, addTask, removeTask,handleAccept,handleComplete,addTeamTask,removeTeamTask }=useContext(TaskContext)
    const [userList, setUserList] = useState(JSON.parse(localStorage.getItem('users')));
    const matchingUserObjects = userList.filter(user => selectedMembers.includes(user.name));
    console.log(matchingUserObjects)
  return (
    <div className='bg-white shadow-sm w-full px-6 py-6 rounded-lg mt-5'>
   
      <div className='flex justify-between items-center'>
        <h1 className='text-center text-black font-semibold'>{teamName}</h1>
        <div className='text-black'>
          <h1 className='font-semibold'> {teamTaskName}</h1>
        </div>
        <div className='flex justify-center items-center gap-2'>
<button className='btn bg-yellow-500 text-white '><FaEdit className='text-lg '/></button>
<button className='btn bg-red-500 text-white'><FaTrashAlt className='text-lg 'onClick={()=>removeTeamTask(index)}/></button>
</div>
      </div>
<div className='mt-4'>
  <h6 className='text-black font-semibold mb-2'>Description</h6>
  <p className='text-justify'>{teamTaskDesc}</p>
</div>
<div className='flex justify-between items-center mt-6'>
  <div>
  <div className="avatar-group -space-x-6">
 {matchingUserObjects?.map((user,index)=> <div key={index} className="avatar">
    <div className="w-12">
      <img src={user?.photo} />
    </div>
  </div>)}
 
</div>
  </div>
  <div>
<p>
  {status}
</p>
</div>

</div>

        </div>
  )
}

export default TeamCard
