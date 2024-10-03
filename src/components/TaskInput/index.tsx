import React, { useContext, useEffect, useRef, useState } from "react";


import { FireStoreContext } from "../../contexts/FireStoreContext";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";
import "../../App.css";

const TaskInput: React.FC = () => {
  const priorityPopUpRef = useRef<HTMLInputElement>(null);
  const [inputedTask, setInputedTask] = useState<string>("");
  const firestorecontext = useContext(FireStoreContext);
  const firebaseauthcontext = useContext(FirebaseAuthContext);
  const loginedUser = firebaseauthcontext?.loginedUser;
  const taskToEdit = firestorecontext?.taskToEdit;

  const [taskPriority, setTaskPriority] = useState<string>("Normal");

  const handleTaskInputFieldChange = (e: { target: { value: any } }) => {
    const newTask = e.target.value;
    setInputedTask(newTask);
  };

  const handleAddTaskBtnClick = () => {
    if (inputedTask) {
      if (firestorecontext?.taskToEdit.id) {
        const Id = firestorecontext.taskToEdit.id;
        firestorecontext.updateTask(inputedTask, taskPriority, Id);
      } else {
        firestorecontext?.addTodo(loginedUser.uid, taskPriority, inputedTask);
      }

      setInputedTask("");
    } else {
      alert("Please Enter Task..");
    }
  };

  const handlePriorityPopUpTogle = () => {
    console.log(
      "priorityPopUpRef classList:",
      priorityPopUpRef.current?.classList.contains
    );
    if (priorityPopUpRef.current?.classList.contains("hidden")) {
      priorityPopUpRef.current.classList.remove("hidden");
    } else {
      priorityPopUpRef.current?.classList.add("hidden");
    }
  };

  const handlePriorityClick = (priority: string) => {
    setTaskPriority(priority);
    handlePriorityPopUpTogle();
  };
  useEffect(() => {
    if (taskToEdit && taskToEdit.id) {
      setInputedTask(taskToEdit.task);
    }
  }, [loginedUser, taskToEdit]);

  return (
    <div
      style={{
        backgroundColor: "var(--task-input-color",
        borderColor: "var(--task-input-border-color)",
      }}
      className="w-full rounded-md border-rgb(59,146,252) h-16 border-2 flex items-center justify-center text-2xl  cursor-pointer mt-10 ] transition-colors mb-10 px-8  shadow-xl "
    >
      <input
        value={inputedTask}
        onChange={handleTaskInputFieldChange}
        className="border-none outline-none h-full flex-1 bg-transparent "
        placeholder="Task name "
      ></input>
      <div className="flex gap-4 ">
        <div
          className={`px-4 py-1 border-2 ${taskPriority} text-black rounded-full cursor-default`}
        >
          {taskPriority}
        </div>
        <div className="priority-selector  relative">
          <div
            onClick={handlePriorityPopUpTogle}
            className="px-4 py-1 border-2 border-[#0000006a] text-black rounded-full "
          >
            <i className="fa-solid fa-flag"></i>
          </div>
          <span
            //  style={{backgroundColor:'var(--popup-color'}}
            ref={priorityPopUpRef}
            className=" flex-start hidden flex-col gap-6 rounded-md border-2 px-4  py-2 absolute top-[110%]  items-start bg-white"
          >
            <h1
              className="hover:bg-[#0000001e]  px-2 flex gap-1 items-center  w-full text-start"
              onClick={() => handlePriorityClick("High")}
            >
              <i className="fa-solid fa-flag High-icon"></i> <h1>High</h1>
            </h1>
            <h1
              className="hover:bg-[#0000001e] px-2 flex gap-1 items-center  w-full text-start "
              onClick={() => handlePriorityClick("Medium")}
            >
              <i className="fa-solid fa-flag Medium-icon"></i> <h1>Medium</h1>
            </h1>
            <h1
              className="hover:bg-[#0000001e] px-2 flex gap-1 items-center  w-full text-start"
              onClick={() => handlePriorityClick("Low")}
            >
              <i className="fa-solid fa-flag Low-icon"></i> <h1>Low</h1>
            </h1>

            <h1
              className="hover:bg-[#0000001e] px-2  flex gap-1 items-center  w-full text-start"
              onClick={() => handlePriorityClick("Normal")}
            >
              <i className="fa-solid fa-flag Normal-icon"></i> <h1>Normal</h1>
            </h1>
          </span>
        </div>
        <div
          style={{ backgroundColor: "var(--primary-color" }}
          onClick={handleAddTaskBtnClick}
          className="h-10 w-10 rounded-full  text-2xl font-semibold flex items-center justify-center text-white"
        >
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
