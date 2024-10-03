import React, { useContext, useEffect, useState } from 'react'
import loginImage from '../../assets/Illustrations/LoginScreenImage2.svg'
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const firebasecontext=useContext(FirebaseAuthContext);
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('');
 
  const loginedUser=firebasecontext?.loginedUser;
  const navigate=useNavigate();

  const handleLoginBtnClick=()=>{
    const result= firebasecontext?.loginUserWithEmailAndPassword(email,password);

  }

  useEffect(()=>{

    if(loginedUser!==undefined){
      if(loginedUser){
        navigate('/')
      }
    }
    
  },[loginedUser,navigate])
  
  return (
    <div className="w-[100vw]   h-[100vh] text-start flex  px-4 py-4">
    {/*login form */}
   <div className='w-1/2 flex flex-col gap-4 text-center items-center justify-center '>
    <h1 className='text-3xl font-bold '>Welcome Back! Let's Get Things Done</h1>
   

<input name='email' id='email' onChange={(e)=>setEmail(e.target.value)} className='h-10 w-[60%] border-2 rounded-md border-gray-600 flex items-center justify-center px-3' placeholder='Your email'></input>
<input type='password' name='password' id='password' onChange={(e)=>setPassword(e.target.value)}  className='h-10 w-[60%] border-2 rounded-md border-gray-600 flex items-center justify-center px-3' placeholder='Your password'></input>
<button style={{backgroundColor:'var(--primary-color'}} onClick={handleLoginBtnClick} className='h-10 w-[60%] border-2 rounded-md border-gray-600 flex items-center justify-center text-white'>Login</button>

<h1>Dont have an account yet ? <u onClick={()=>navigate('/signup')} className='text-[#008eb1] cursor-pointer font-semibold '>SingUp</u></h1>

   </div>

   {/*visuals */}
   <div className='w-1/2 h-full '>
<img className='h-full w-full' src={loginImage} alt='Login image'/>
   </div>
  </div>
  )
}

export default LoginPage