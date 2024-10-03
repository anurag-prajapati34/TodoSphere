
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "./container/SideBarContainer";
import { useContext, useEffect } from "react";
import { FirebaseAuthContext } from "./contexts/FirebaseAuthContext";

function App() {
  const firebasecontext =useContext(FirebaseAuthContext)
const loginedUser=firebasecontext?.loginedUser;

const navigate=useNavigate();
  useEffect(()=>{

    if(loginedUser!==undefined){
      if(loginedUser){
        navigate('/')
      }else{
        navigate('login')
      }
    }
    
  },[loginedUser,navigate])

  return (
    <div className="w-[100vw]  justify-between   min-h-[100vh] text-start flex    ">

      <Outlet />
<SideBar/>
    </div>
  );
}

export default App;
