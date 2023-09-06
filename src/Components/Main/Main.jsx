import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";

const Main = () => {
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
                <li className="flex place-items-center items-center gap-3 hover:bg-slate-200 hover:p-2 hover:rounded-s-lg duration-200 cursor-pointer hover:text-blue-500">
                  <AiFillHome />
                  <span>Home</span>
                </li>
              </Link>
              <Link to="/createteam">
                <li className="flex place-items-center items-center gap-3 hover:bg-slate-200 hover:p-2 hover:rounded-s-lg mt-4 duration-200 cursor-pointer hover:text-blue-500">
                  <BsPeople />
                  <span>Create Team</span>
                </li>
              </Link>

              <Link to="/dashboard">
                <li className="flex place-items-center items-center gap-3 hover:bg-slate-200 hover:p-2 hover:rounded-s-lg mt-4 duration-200  cursor-pointer hover:text-blue-500">
                  <AiOutlineDashboard />
                  <span>Dashboard</span>
                </li>
              </Link>
            </ul>

            <div className="text-center mt-40">
              <button className=" btn bg-blue-500 text-white px-9 hover:-translate-y-3 duration-200 shadow-md">
                Add Task +
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-10">
          <div className="min-h-screen">
            <div className="navbar  pt-6 text-neutral-content items-center flex justify-end">
              <div className="text-black flex gap-6 justify-center items-center">
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold">sdafsadf</h5>
                  <p>sdafasdf</p>
                </div>
                <ul className="flex justify-center items-center gap-5">
                  <li>
                    <Link to="/login">
                      <button className="btn bg-blue-600 text-white px-5">
                        Login
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button className="btn   px-5"> Signup</button>
                    </Link>
                  </li>
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
