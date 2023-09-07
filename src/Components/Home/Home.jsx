import React, { useContext, useState } from "react";
import { TaskContext } from "../TaskProvider/TaskProvider";
import useAuth from "../hooks/useAuth/useAuth";
import { Link } from "react-router-dom";
import { RiPassPendingFill } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { MdDone } from "react-icons/md";

const Home = () => {
  const { tasks, addTask, removeTask, handleAccept, handleComplete } =
    useContext(TaskContext);

  const { user } = useAuth();
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("users"))
  );
  const [sortType, setSortType] = useState(null);
  const [sortDueDate, setSortDueDate] = useState(null);

  const handleSortDueDate = (type) => {
    setSortDueDate(type);
  };

  const handleSort = (type) => {
    setSortType(type);
    
  };
  const [selectedPriority, setSelectedPriority] = useState(null);

  // Create a function to handle priority filtering
  const handleFilterByPriority = (priority) => {
    setSelectedPriority(priority);
  };
  // Function to sort tasks based on sortType
  const sortedTasks = () => {
    let sorted = [...tasks];
  
    if (sortType) {
      sorted = sorted.filter((task) => task.status === sortType);
    }
  
    if (sortDueDate) {
      sorted = sorted.filter((task) => task.dueDate === sortDueDate);
    }
  
    // Add priority filter
    if (selectedPriority) {
      sorted = sorted.filter((task) => task.priority === selectedPriority);
    }
  
    return sorted;
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-5xl mx-auto mt-6">
<div>
<div className="dropdown dropdown-start">
          <label tabIndex={0} className="btn m-1">
           Filter by Priority
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a onClick={() => handleFilterByPriority(null)}>All</a></li>
         <li><a onClick={() => handleFilterByPriority("low")}>Low</a></li>
         <li><a onClick={() => handleFilterByPriority("medium")}>Medium</a></li>
         <li><a onClick={() => handleFilterByPriority("high")}>High</a></li>
          </ul>
        </div>


</div>
   <div>

   <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Sort By Due Date
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {tasks.map((x,index)=>  <li key={index}>
              <a onClick={() => handleSortDueDate(x?.dueDate)}>{x?.dueDate}</a>
            </li>)}
         
          </ul>
        </div>



        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Sort
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a onClick={() => handleSort(null)}>All</a>
            </li>
            <li>
              <a onClick={() => handleSort("pending")}>Pending</a>
            </li>
            <li>
              <a onClick={() => handleSort("inprogress")}>In Progress</a>
            </li>
            <li>
              <a onClick={() => handleSort("completed")}>Completed</a>
            </li>
          </ul>
        </div>
   </div>
      </div>

      <section className="grid h-[410px] overflow-y-auto overflow-x-auto gap-9 max-w-5xl mt-7 mx-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {/* Pending */}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-yellow-500 mb-4 gap-2 flex justify-between items-center ">
              <RiPassPendingFill className="text-3xl" />
              <span>Pending</span>
            </h1>
            <div className="bg-yellow-500 border-yellow-600 border-2 px-3 py-2  rounded-xl ">
              <span className="text-yellow-800">
                {sortedTasks()?.filter((x) => x?.status === "pending")?.length}
              </span>
            </div>
          </div>

          <div className="flex justify-center flex-col items-start">
            {sortedTasks()
              .filter((x) => x.status === "pending")
              .map((task, index) => (
                <div
                  key={index}
                  className="w-full bg-base-100 shadow-xl px-4 py-4 mt-4"
                >
                  <div>
                    <h2 className="card-title flex justify-between items-center">
                      <span>{task?.title}</span>
                      {!user ? (
                        <Link to="/login">
                          <button className="btn">:</button>
                        </Link>
                      ) : (
                        <details className="dropdown dropdown-end">
                          <summary className="m-1 btn">:</summary>
                          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li>
                              {task.assignTask === user.displayName ? (
                                <a onClick={() => handleAccept(task?.id)}>Accept</a>
                              ) : (
                                <a onClick={() => removeTask(index)}>Delete</a>
                              )}
                            </li>
                          </ul>
                        </details>
                      )}
                    </h2>
                    <p className="mt-2">{task.description}</p>
                    <div className="flex mt-5 justify-between items-center">
                      <div>
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={userList?.find((x) => x?.name === task?.assignTask)?.photo}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div>{task.dueDate}</div>
                      <div
                        className={
                          (task?.priority === "medium" && "text-yellow-500") ||
                          (task?.priority === "high" && "text-red-500") ||
                          (task?.priority === "low" && "text-green-500")
                        }
                      >
                        {task.priority}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-yellow-700 mb-4 gap-2 flex justify-between items-center">
              <GiProgression className="text-3xl" />
              <span>In Progress</span>
            </h1>
            <div className="bg-yellow-600 border-yellow-300 border-2 px-3 py-2  rounded-xl ">
              <span className="text-yellow-300">
                {sortedTasks()?.filter((x) => x?.status === "inprogress").length}
              </span>
            </div>
          </div>

          {sortedTasks()
            .filter((x) => x.status === "inprogress")
            .map((task, index) => (
              <div
                key={index}
                className="w-full bg-base-100 shadow-xl px-4 py-4 mt-4"
              >
                <div>
                  <h2 className="card-title flex justify-between items-center">
                    <span>{task?.title}</span>
                    {!user ? (
                      <Link to="/login">
                        <button className="btn">:</button>
                      </Link>
                    ) : (
                      <details className="dropdown dropdown-end">
                        <summary className="m-1 btn">:</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            {task.assignTask === user.displayName ? (
                              <a onClick={() => handleComplete(task?.id)}>Complete</a>
                            ) : (
                              <a onClick={() => removeTask(index)}>Delete</a>
                            )}
                          </li>
                        </ul>
                      </details>
                    )}
                  </h2>
                  <p className="mt-2">{task.description}</p>
                  <div className="flex mt-5 justify-between items-center">
                    <div>{task?.assignTask}</div>
                    <div>{task?.dueDate}</div>
                    <div
                      className={
                        (task?.priority === "medium" && "text-yellow-500") ||
                        (task?.priority === "high" && "text-red-500") ||
                        (task?.priority === "low" && "text-green-500")
                      }
                    >
                      {task?.priority}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Completed */}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-green-500 mb-4 flex justify-center items-center gap-2">
              <MdDone className="text-3xl" />
              <span>Completed</span>
            </h1>
            <div className="bg-green-500 border-green-600 border-2 px-3 py-2 text-white rounded-xl  ">
              {sortedTasks()?.filter((x) => x.status === "completed")?.length}
            </div>
          </div>

          {sortedTasks()
            ?.filter((x) => x.status === "completed")
            .map((task, index) => (
              <div
                key={index}
                className="w-full bg-base-100 shadow-xl px-4 py-4 mt-4"
              >
                <div>
                  <h2 className="card-title flex justify-between items-center">
                    <span>{task.title}</span>
                    {user?.email === task.ownerEmail && (
                      <button
                        onClick={() => removeTask(index)}
                        className="text-white btn bg-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </h2>
                  <p className="mt-2">{task.description}</p>
                  <div className="flex mt-5 justify-between items-center">
                    <div>{task.assignTask}</div>
                    <div>{task.dueDate}</div>
                    <div
                      className={
                        (task?.priority === "medium" && "text-yellow-500") ||
                        (task?.priority === "high" && "text-red-500") ||
                        (task?.priority === "low" && "text-green-500")
                      }
                    >
                      {task?.priority}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Home;
