import React, { useContext } from "react";

import TeamCard from "./TeamCard";
import { TaskContext } from "../TaskProvider/TaskProvider";


const CreateTeam = () => {
const{ tasks,teamTasks, addTask, removeTask,handleAccept,handleComplete,addTeamTask,removeTeamTask }=useContext(TaskContext)

  return (
    <>
      <section className="mt-7">
        <div className="grid h-[470px] overflow-y-auto lg:grid-cols-12 gap-5 grid-cols-1 max-w-5xl mx-auto">
          <div className="lg:col-span-9">
            <div className="flex justify-end items-center flex-col">
             {teamTasks?.map((task,index)=> <TeamCard key={index} {...task} index={index}/>)}
            </div>
          </div>
          <div className="lg:col-span-3">asdfsdafsdaf</div>
        </div>
      </section>
    </>
  );
};

export default CreateTeam;
