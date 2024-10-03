import React, { useContext, useEffect, useState } from "react";

import Task from "../../components/Task";
import { FireStoreContext } from "../../contexts/FireStoreContext";
import deadlineImage from "../../assets/Illustrations/Deadline.svg";

export const AllTasksContainer = () => {
  const firestorecontext = useContext(FireStoreContext);
  const alltasks = firestorecontext?.allTasks || [];

  const [uncompletedTasks, setUncompletedTasks] = useState<Array<object>>([]);

  useEffect(() => {
    const uncompletedTasks = alltasks.filter((taskobj) => {
      const { isCompleted } = taskobj;
      if (!isCompleted) {
        return taskobj;
      }
    });

    setUncompletedTasks(uncompletedTasks);
  }, [alltasks]);
  return (
    <div className="flex flex-col gap-5  scrollbar-hidden mb-10">
      {uncompletedTasks?.length > 0 ? (
        uncompletedTasks.map((taskObj, index) => {
          const { task, taskPriority, isCompleted, id } = taskObj;

          if (isCompleted == false) {
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
          <h1 className="text-lg font-semibold">No tasks yet !</h1>
          <img className="w-[300px] " src={deadlineImage} />
        </div>
      )}
    </div>
  );
};
