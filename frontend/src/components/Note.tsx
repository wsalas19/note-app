import React from 'react'
import {NoteProps} from '../../utils/types'

const Note:React.FC<NoteProps> =  ({ category, archived, text, createdAt }) =>  {

   //const truncatedText = text.length > 100 ? `${text.substring(0, 95)}...` : text;
  return (
   <div className={`mb-2 overflow-clip flex flex-col justify-between rounded-md shadow-md p-4 bg-white ${archived ? 'border-2 border-gray-300' : 'border-2 border-blue-500'} lg:w-[20%]`}>
   <div className='flex justify-between gap-2 items-center mb-2'>
    <div>
     <span className='category-tag'>{category}</span>
     {archived && <span className='archived-tag'>Archived</span>}

    </div>
    <button className='btn-secondary'>delete</button>
   </div>
   <p className='text-base cut-off'>{text}</p>
   <div className='flex justify-end mt-2'>
     <span className='text-xs text-gray-500'>{createdAt}</span>
   </div>
 </div>
  )
}

export default Note