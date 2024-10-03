import React, { useContext } from 'react'

import TaskInput from '../../components/TaskInput'

import { NavLink, Outlet } from 'react-router-dom'
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext'
export const HomePage:React.FC = () => {

  const firebasecontext =useContext(FirebaseAuthContext)
  const loginedUser=firebasecontext?.loginedUser;
  return (
    <div className='w-3/4 max-w-[1280px] px-6 py-5 '>
 
 <div className='greeting mb-10'>
  <h1 className='text-4xl font-extrabold'>Welcom Back ! {loginedUser?.displayName} ✨</h1>
  <p className='text-lg'>What's your today's plan</p>

</div>
<TaskInput/>
<div className='w-1/2 flex  gap-10 items-center mb-5'>

<NavLink to={'/'} className={({isActive})=>`px-4 py-1 border-2 border-gray-700 rounded-full ${isActive?'bg-black text-white':'text-black'}`}>All</NavLink>
<NavLink to={'completed'} className={({isActive})=>`px-4 py-1 border-2 border-gray-700 rounded-full ${isActive?'bg-black text-white':'text-black'}`}>Completed</NavLink>


</div>


<Outlet/>
    </div>
  )
}
