import React, { useContext } from "react";

import Task from "../../components/Task";
import { FireStoreContext } from "../../contexts/FireStoreContext";
import checklistImage from "../../assets/Illustrations/Checklist 1.svg";

const CompletedTasksContainer = () => {
  const firestorecontext = useContext(FireStoreContext);
  const allTasks = firestorecontext?.allTasks;
  return (
    <div className="flex flex-col gap-5  scrollbar-hidden ">
      {allTasks.length > 0 ? (
        allTasks.map((taskObj, index) => {
          const { task, taskPriority, isCompleted, id } = taskObj;

          if (isCompleted == true) {
            return (
              <Task
                key={index}
                task={task}
                priority={taskPriority}
                isCompleted={isCompleted}
                id={id}
              />
            );
          }
        })
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-semibold">
            There is no completed tasks yet!
          </h1>
          <img className="w-[300px]" src={checklistImage} />
        </div>
      )}
    </div>
  );
};

export default CompletedTasksContainer;
