import React from 'react'
import '../../App.css'

interface propstype{
    priority:string
}
const Priority:React.FC<propstype> = ({priority}) => {
  return (
    <div className={`${priority} flex items-center justify-center px-4 py-1 text-black  rounded-full  font-semibold`}>
         {priority}
        </div>
  )
}

export default Priority