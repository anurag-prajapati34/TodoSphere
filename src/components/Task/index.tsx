import React, { useContext } from "react";

import Priority from "../Priority";
import { FireStoreContext } from "../../contexts/FireStoreContext";

interface propTyps {
  task: string;
  priority: string;
  isCompleted: boolean;
  id: any;
}
const Task: React.FC<propTyps> = (props) => {
  const firestorecontext = useContext(FireStoreContext);

  const { isCompleted } = props;

  return (
    <div className="w-full rounded-md shadow-lg py-3 px-6 border-[1px] flex gap-8 items-center justify-between  ">
      <div className="flex gap-8 items-center">
        <i
          onClick={() => {
            if (!isCompleted) {
              firestorecontext?.completeTask(props.id);
            }
          }}
          className={` text-3xl cursor-pointer ${
            isCompleted ? "fa-regular fa-circle-check " : "fa-regular fa-circle"
          }`}
        ></i>
        <div>
          <h1 className="task text-lg font-semibold">{props.task}</h1>
        </div>
      </div>

      <div className="flex gap-4">
        <Priority priority={props.priority} />

        <div
          onClick={() => firestorecontext?.editTask(props.task, props.id)}
          style={{ backgroundColor: "var(--primary-color" }}
          className="h-10 w-10 rounded-full  flex items-center justify-center cursor-pointer text-white"
        >
          <i className="fa-solid fa-pencil"></i>
        </div>
        <div
          style={{ backgroundColor: "var(--primary-color" }}
          onClick={() => firestorecontext?.deleteTask(props.id)}
          className="h-10 w-10 text-white  rounded-full flex items-center justify-center cursor-pointer"
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default Task;
