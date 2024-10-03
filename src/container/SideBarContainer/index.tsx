import  { useContext, useEffect, useState } from 'react'
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext'
import '../../App.css'
export const SideBar = () => {

  const firebasecontext=useContext(FirebaseAuthContext);
  const loginedUser=firebasecontext?.loginedUser

  const [userName,setUserName]=useState('XYZ');

  useEffect(()=>{

    
    if(loginedUser && loginedUser.displayName)
setUserName(loginedUser.displayName)

  },[loginedUser])

  return (
    <div  className='w-1/4
     min-h-full   px-4 py-5 flex flex-col text-end 
     '
    >

<div className=" flex flex-col flex-grow-0 items-end gap-1  text-end" >

<div className="h-[50px] w-[50px] rounded-full bg-sky-600 text-lg flex items-center justify-center font-semibold cursor-pointer shadow-xl">{
  userName[0]
  
}</div>


  <h1 className='text-lg'>{ loginedUser?loginedUser.email:'no email'}</h1>
  <h1 onClick={firebasecontext?.logoutUser} className="text-lg font-semibold text-red-800 cursor-pointer">Logout</h1>


</div>





    </div>
  )
}
