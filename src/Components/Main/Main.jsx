import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import useAuth from "../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import { TaskContext } from "../TaskProvider/TaskProvider";

const Main = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("users"))
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [assignTask, setAssignTask] = useState("");
  const { tasks, addTask, removeTask, addTeamTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      dueDate === "" ||
      priority === "" ||
      assignTask === ""
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    let task = {
      title,
      description,
      dueDate,
      priority,
      assignTask,
      ownerEmail: user?.email,
      status: "pending",
    };
    addTask(task);
  
  };

  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamTaskName, setTeamTaskName] = useState("");
  const [memberOptions] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [teamTaskDesc, setTeamTaskDesc] = useState("");
  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (
      teamName === "" ||
      selectedMembers === "" ||
      teamTaskName === "" ||
      teamTaskDesc === ""
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    let teamTask = {
      teamName,
      selectedMembers,
      teamTaskName,
      teamTaskDesc,
      status: "Inprogress",
      ownerEmail: user?.email,
    };
    addTeamTask(teamTask);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Task successfully added!",
      showConfirmButton: false,
      timer: 1500,
    });

    setTeamName("");
    setSelectedMembers("");
    setTeamTaskName("");
    setTeamTaskDesc("");
  };

  const handleMemberChange = (e, member) => {
    const memberName = member.name; // Get the member name
    if (e.target.checked) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        memberName,
      ]); // Add member name to the selectedMembers array
    } else {
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter((name) => name !== memberName)
      ); // Remove member name from selectedMembers
    }
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
            <Link to="/allusers">
                <li
                  className={`${
                    location.pathname === "/allusers"
                      ? "bg-slate-200 flex place-items-center items-center gap-3  p-2  rounded-s-lg text-blue-500 "
                      : "flex place-items-center items-center gap-3 hover:bg-slate-200 hover:p-2 hover:rounded-s-lg duration-200 cursor-pointer hover:text-blue-500"
                  } mb-4`}
                >
                 <BsPeople />
                  <span>Allusers</span>
                </li>
              </Link>
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
              {!user?.email ? (
                <button
                  className=" btn bg-blue-500 text-white px-9 hover:-translate-y-3 duration-200 shadow-md"
                  onClick={() => navigate("/login")}
                >
                  Add Task +
                </button>
              ) : (
                <button
                  className=" btn bg-blue-500 text-white px-9 hover:-translate-y-3 duration-200 shadow-md"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Add Task +
                </button>
              )}
              <dialog id="my_modal_1" className="modal">
                <Toaster position="top-center" reverseOrder={false} />
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
                        <option>Assign Task</option>
                        {userList
                          ?.filter((x) => x?.email !== user?.email)
                          ?.map((x, index) => (
                            <option key={index} value={x?.name}>
                              {x?.name}
                            </option>
                          ))}
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
                        <option>Select Priority</option>
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
            <div className="flex lg:hidden justify-between items-center pt-4">
              <div>
                
              {location.pathname === "/createteam" && (
                <div>
                  {!user?.email ? (
                    ""
                  ) : (
                    <button
                      className="btn text-white bg-blue-500"
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      Create Team +
                    </button>
                  )}
                  <dialog id="my_modal_2" className="modal text-black">
                    <Toaster position="top-center" reverseOrder={false} />
                    <div className="modal-box">
                      <h2 className="text-2xl font-semibold mb-4">
                        Create a Team
                      </h2>
                      <div className="bg-white p-6 rounded">
                        <div className="mb-4">
                          <label
                            htmlFor="teamName"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Team Name
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="taskName"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Task Name
                          </label>
                          <input
                            type="text"
                            id="taskName"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Task Name"
                            value={teamTaskName}
                            onChange={(e) => setTeamTaskName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Task Description
                          </label>
                          <textarea
                            type="text"
                            id="description"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Task Description"
                            value={teamTaskDesc}
                            onChange={(e) => setTeamTaskDesc(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="mb-4 overflow-y-auto h-36">
                          <label className="block text-gray-700 font-bold mb-2">
                            Invite Team Members
                          </label>
                          {memberOptions
                            ?.filter((x) => x?.name !== user?.displayName)
                            ?.map((member, index) => (
                              <div
                                key={index}
                                className="flex items-center mb-2"
                              >
                                <input
                                  type="checkbox"
                                  value={index}
                                  onChange={(e) =>
                                    handleMemberChange(e, member)
                                  } // Pass the member object to handleMemberChange
                                  checked={selectedMembers.includes(
                                    member.name
                                  )}
                                  className="mr-2"
                                />
                                <label htmlFor={index}>{member?.name}</label>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="modal-action">
                        <form
                          method="dialog"
                          className="flex justify-center items-center gap-5"
                        >
                          <button
                            className="btn bg-blue-500 text-white px-6"
                            onClick={handleSubmit1}
                            type="button"
                          >
                            Submit
                          </button>
                          <button className="btn bg-red-500 text-white">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              )}

              </div>
             {/* navmenu */}
             <div>
             <div className="dropdown dropdown-end">
  <label tabIndex={0} className="btn m-1 text-2xl text-blue-500">=</label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a> {user?.email && (
                  <div className="avatar">
                    <div className="w-14 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                )}</a>
                
               {user?.email&&<a>{user?.displayName}</a>} 

                
                </li>
    <li>
      {user?.email?<a onClick={logOut} >logout</a>:<Link to='/login'>Login</Link>}
    </li>
{!user?.email&&
    <li>
     <a>Signup</a>
    </li>}

 <Link to="/allusers">
                <li
                 
                >
                
                  <span>Allusers</span>
                </li>
              </Link>
              <Link to="/">
                <li
                 
                >
             
                  <span>Home</span>
                </li>
              </Link>
              <Link to="/createteam">
                <li
                  
                >
                  
                  <span>Create Team</span>
                </li>
              </Link>
              <Link to="/dashboard">
                <li
                 
                >
                
                  <span>Dashboard</span>
                </li>
              </Link>






  </ul>
</div>
</div>
            </div>
            <div
              className={`navbar  pt-6 text-neutral-content items-center hidden lg:flex ${
                location.pathname === "/createteam"
                  ? "justify-between"
                  : "justify-end"
              }`}
            >
              {location.pathname === "/createteam" && (
                <div>
                  {!user?.email ? (
                    ""
                  ) : (
                    <button
                      className="btn text-white bg-blue-500"
                      onClick={() =>
                        document.getElementById("my_modal_2").showModal()
                      }
                    >
                      Create Team +
                    </button>
                  )}
                  <dialog id="my_modal_2" className="modal text-black">
                    <Toaster position="top-center" reverseOrder={false} />
                    <div className="modal-box">
                      <h2 className="text-2xl font-semibold mb-4">
                        Create a Team
                      </h2>
                      <div className="bg-white p-6 rounded">
                        <div className="mb-4">
                          <label
                            htmlFor="teamName"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Team Name
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="taskName"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Task Name
                          </label>
                          <input
                            type="text"
                            id="taskName"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Task Name"
                            value={teamTaskName}
                            onChange={(e) => setTeamTaskName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Task Description
                          </label>
                          <textarea
                            type="text"
                            id="description"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter Task Description"
                            value={teamTaskDesc}
                            onChange={(e) => setTeamTaskDesc(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="mb-4 overflow-y-auto h-36">
                          <label className="block text-gray-700 font-bold mb-2">
                            Invite Team Members
                          </label>
                          {memberOptions
                            ?.filter((x) => x?.name !== user?.displayName)
                            ?.map((member, index) => (
                              <div
                                key={index}
                                className="flex items-center mb-2"
                              >
                                <input
                                  type="checkbox"
                                  value={index}
                                  onChange={(e) =>
                                    handleMemberChange(e, member)
                                  } // Pass the member object to handleMemberChange
                                  checked={selectedMembers.includes(
                                    member.name
                                  )}
                                  className="mr-2"
                                />
                                <label htmlFor={index}>{member?.name}</label>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="modal-action">
                        <form
                          method="dialog"
                          className="flex justify-center items-center gap-5"
                        >
                          <button
                            className="btn bg-blue-500 text-white px-6"
                            onClick={handleSubmit1}
                            type="button"
                          >
                            Submit
                          </button>
                          <button className="btn bg-red-500 text-white">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              )}
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
                        <button className="btn px-5"> Signup</button>
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
