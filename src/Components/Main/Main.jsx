import React, { useState } from "react";
import { Link, Outlet,  useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import useAuth from "../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const Main = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const[userList,setUserList]=useState(JSON.parse(localStorage.getItem('users')))
const navigate=useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [assignTask, setAssignTask] = useState("");

  let handleSubmit = (e) => {

    e.preventDefault();

    let task={
      title,
description,
dueDate,
priority,
assignTask,
ownerEmail:user?.email,
status:'pending'
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];


    existingTasks.push(task);
  
   
    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Task successfully added!',
      showConfirmButton: false,
      timer: 1500
    })
 
  };
  return (
    <>
      <section className="grid lg:grid-cols-12 grid-cols-1">
        <div className="lg:col-span-2 hidden lg:block">
          <div className="min-h-screen bg-white pt-16">
            <div>
              <img
                src="https://i.ibb.co/Kz6fC3T/Group-96.png"
                className="img-fluid mx-auto"
              />
            </div>

            <ul className="mt-36 ms-10">
              <Link to="/">
                <li
                  className={`${
                    location.pathname === "/"
                      ? "bg-slate-200 flex place-items-center items-center gap-3  p-2  rounded-s-lg text-blue-500 "
                      : "flex place-items-center items-center gap-3 hover:bg-slate-200 hover:p-2 hover:rounded-s-lg duration-200 cursor-pointer hover:text-blue-500"
                  } `}
                >
                  <AiFillHome />
                  <span>Home</span>
                </li>
              </Link>
              <Link to="/createteam">
                <li
                  className={`${
                    location.pathname === "/createteam"
                      ? "bg-slate-200 flex place-items-center items-center gap-3  p-2  rounded-s-lg text-blue-500 "
                      : "flex place-items-center items-center gap-3 hover:bg-slate-200 hover:p-2 hover:rounded-s-lg duration-200 cursor-pointer hover:text-blue-500"
                  }  mt-4`}
                >
                  <BsPeople />
                  <span>Create Team</span>
                </li>
              </Link>

              <Link to="/dashboard">
                <li
                  className={`${
                    location.pathname === "/dashboard"
                      ? "bg-slate-200 flex place-items-center items-center gap-3  p-2  rounded-s-lg text-blue-500 "
                      : "flex place-items-center items-center gap-3 hover:bg-slate-200 hover:p-2 hover:rounded-s-lg duration-200 cursor-pointer hover:text-blue-500"
                  } mt-4`}
                >
                  <AiOutlineDashboard />
                  <span>Dashboard</span>
                </li>
              </Link>
            </ul>

            <div className="text-center mt-40">
           {!user?.email?<button
                className=" btn bg-blue-500 text-white px-9 hover:-translate-y-3 duration-200 shadow-md"
                onClick={()=>navigate('/login')}
              >
                {" "}
                Add Task +
              </button>:   <button
                className=" btn bg-blue-500 text-white px-9 hover:-translate-y-3 duration-200 shadow-md"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                {" "}
                Add Task +
              </button>}
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box text-start">
                  <h3 className="font-bold text-lg">Add</h3>
                  <form>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-gray-600">
                        Title:
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-gray-600"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="dueDate" className="block text-gray-600">
                        Due Date:
                      </label>
                      <input
                        type="date"
                        id="dueDate"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="assigntask"
                        className="block text-gray-600"
                      >
                        Assign Task:
                      </label>
                      <select
                        id="assigntask"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={assignTask}
                        onChange={(e) => setAssignTask(e.target.value)}
                        required
                      >
                        {userList.filter((x)=>x?.email!==user?.email).map((x,index)=><option key={index} value={x?.name}>{x?.name}</option>)}

               
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="priority" className="block text-gray-600">
                        Priority:
                      </label>
                      <select
                        id="priority"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </form>
                  <div className="modal-action">
                    <form method="dialog">
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 btn me-4"
                      >
                        Add Task
                      </button>
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="lg:col-span-10">
          <div className="min-h-screen">
            <div className="navbar  pt-6 text-neutral-content items-center flex justify-end">
              <div className="text-black flex gap-6 justify-center items-center">
                {user?.email && (
                  <div className="avatar">
                    <div className="w-14 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                )}
                {user?.email && (
                  <div>
                    <h5 className="font-semibold">{user?.displayName}</h5>
                  </div>
                )}
                <ul className="flex justify-center items-center gap-5">
                  {user?.email ? (
                    <li>
                      <button
                        onClick={logOut}
                        className="btn bg-blue-600 text-white px-5"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link to="/login">
                        <button className="btn bg-blue-600 text-white px-5">
                          Login
                        </button>
                      </Link>
                    </li>
                  )}
                  {!user?.email && (
                    <li>
                      <Link to="/signup">
                        <button className="btn   px-5"> Signup</button>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>

  <Outlet />

          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
