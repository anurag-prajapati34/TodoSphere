import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseApp } from "../contexts/FirebaseApp";
import { FirebaseAuthContext } from "./FirebaseAuthContext";
import { updateDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

interface FireStoreContextType {
  addTodo: (userID: string, taskPriority: string, newTask: string) => void;
  allTasks: Array<object>;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;

  editTask: (task: string, taskId: string) => void;
  taskToEdit: object;
  setTaskToEdit: React.Dispatch<React.SetStateAction<object>>;
  updateTask: (newTask: string, taskPriority: string, taskId: string) => void;
}
interface FireStoreContextProviderType {
  children: React.ReactNode;
}

const FireStoreContext = createContext<FireStoreContextType | undefined>(
  undefined
);

const FireStoreContextProvider: React.FC<FireStoreContextProviderType> = ({
  children,
}) => {
  const firebaseauthcontext = useContext(FirebaseAuthContext);

  const loginedUser = firebaseauthcontext?.loginedUser;
  const loginUserId = loginedUser?.uid;
  const [allTasks, settAllTasks] = useState<Array<object>>([]);

  const [taskToEdit, setTaskToEdit] = useState<object>({});

  //add task to firestore db
  const addTodo = async (
    userID: string,
    taskPriority: string,
    newTask: string
  ) => {
    await addDoc(collection(firestore, "users", userID, "todos"), {
      task: newTask,
      taskPriority: taskPriority,
      isCompleted: false,
      createdAt: Date.now(),
    })
      .then((result) => console.log("todo added successfully"))
      .catch((error) => console.log("error adding todo:", error));
  };
  //complete specific task
  const completeTask = async (taskId: string) => {
    const taskRef = doc(firestore, "users", loginUserId, "todos", taskId);
    try {
      await updateDoc(taskRef, { isCompleted: true });
    } catch (err) {
      console.log("error completing todo", err);
    }
  };
  //edit specific task

  const editTask = (task: string, taskId: string) => {
    setTaskToEdit({
      id: taskId,
      task: task,
    });
  };
  //update task
  const updateTask = async (
    newTask: string,
    taskPriority: string,
    taskId: string
  ) => {
    try {
      const taskRef = doc(firestore, "users", loginUserId, "todos", taskId);
      await updateDoc(taskRef, {
        task: newTask,
        taskPriority: taskPriority,
      }).then((result) => setTaskToEdit({}));
    } catch (err) {
      console.log("Error duing update task:", err);
    }
  };

  //delete specific task
  const deleteTask = async (taskId: string) => {
    const taskRef = doc(firestore, "users", loginUserId, "todos", taskId);
    try {
      await deleteDoc(taskRef);
    } catch (err) {
      console.log("error deleting todo", err);
    }
  };
  //fetching all todos
  useEffect(() => {
    if (loginedUser) {
      const userId = loginedUser.uid;

      const todosCollectionRef = collection(
        firestore,
        "users",
        userId,
        "todos"
      );
      const todosSnapShot = getDocs(todosCollectionRef);
      const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) => {
        const fetchedTodos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        settAllTasks(fetchedTodos);
      });
    }
  }, [loginedUser]);

  return (
    <FireStoreContext.Provider
      value={{
        addTodo,
        allTasks,
        completeTask,
        deleteTask,

        editTask,
        taskToEdit,
        setTaskToEdit,
        updateTask,
      }}
    >
      {children}
    </FireStoreContext.Provider>
  );
};

export { FireStoreContext, FireStoreContextProvider };
