import React, { useState } from 'react'

const AllUsers = () => {
    const[userList,setUserList]=useState(JSON.parse(localStorage.getItem('users'))||[])
  return (
    <>
    <section>
    <div className="overflow-x-auto overflow-y-auto h-[456px] mt-10">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='bg-blue-500 text-white'>
        <th>Sl</th>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Bio</th>
      </tr>
    </thead>
    <tbody>
    {userList?.map((user,index)=><tr key={index}>
      <td>{index+1}</td>
        <td><div className="avatar">
  <div className="w-20 rounded">
    <img src={user?.photo} alt="Tailwind-CSS-Avatar-component" />
  </div>
</div></td>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td>{user?.bio}</td>
      </tr>
    )}  
    </tbody>
  </table>
</div>
    </section>
    </>
  )
}

export default AllUsers
