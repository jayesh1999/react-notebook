import React, { useContext,useState } from 'react'
import noteContext from "../context/notes/noteContext"

const NoteItem = props => {
    const context = useContext(noteContext);
    const {deleteNote } = context;

    const { notes,updateNote } = props
    return (
        <div className='col-md-3 my-3'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <div className="d-flex align-items-center">
                        <i className="fas fa-trash mx-3" onClick={()=>{deleteNote(notes._id)}}></i>
                        <i className="fas fa-edit mx-2" onClick={()=>{updateNote(notes)}}></i>
                        </div>
                        <p className="card-text"> {notes.description}</p>
                        <p className="card-text"> {notes.tag}</p>
                        {/* <p className="card-text"> {notes._id}</p> */}
                      
                    </div>
                </div>
                </div>
    )
}

export default NoteItem;