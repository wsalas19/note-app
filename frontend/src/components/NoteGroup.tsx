import React from 'react';
import { NoteProps } from '../../utils/types'; // Adjust the import path as needed
import Note from './Note';



const NoteGroup: React.FC<{notes: NoteProps[]}> = ({ notes }) => {
  return (
    <div className='flex flex-col gap-4 p-4 lg:flex-row lg:flex-wrap lg:justify-start'>
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
};

export default NoteGroup;
