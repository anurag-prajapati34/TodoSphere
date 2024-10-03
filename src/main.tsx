import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/HomePage/index.tsx";
import { AllTasksContainer } from "./container/AllTasksContainer/index.tsx";
import CompletedTasksContainer from "./container/CompletedTasksContainer/index.tsx";

import { FirebaseAuthContextProvider } from "./contexts/FirebaseAuthContext.tsx";
import LoginPage from "./pages/LoginPage/index.tsx";
import SignupPage from "./pages/SignupPage/index.tsx";
import { FireStoreContextProvider } from "./contexts/FireStoreContext.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,

        children: [
          {
            path: "/",
            element: <AllTasksContainer />,
          },
          {
            path: "completed",
            element: <CompletedTasksContainer />,
          },
         
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <FirebaseAuthContextProvider>
    <FireStoreContextProvider>
     
     <RouterProvider router={Router} />
   
    </FireStoreContextProvider>
  </FirebaseAuthContextProvider>
);
