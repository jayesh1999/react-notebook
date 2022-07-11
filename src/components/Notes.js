import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from "../components/NoteItem"
import AddNotes from "./AddNotes"
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context
    const history   = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes()
        }
        else{
            history("/login")
        }
      
    }, [])

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
       // console.log(currentNote)
        ref.current.click();
        setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        //   e.preventDefault();
        ref.current.click();
      //  console.log("updating the note.........", note)
        editNote(note.eid, note.etitle, note.edescription, note.etag)
    }

    const ref = useRef(null)
    const refClose = useRef(null)
    return (
        <>
            <AddNotes />
            <button type="button" className="btn btn-primary d-none" data-toggle="modal" ref={ref} data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' minLength={5} required value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription"  minLength={5} required value={note.edescription} name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag"  minLength={5} required value={note.etag} name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button  disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" ref={refClose} onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <h2>You Notes</h2>
                <div className='row my-3'>
                <div className='container mx-2'> 
                    {notes.length === 0 && "No Notes To Display"}</div>
                    {notes.map((notes) => {
                        return <NoteItem key={notes._id} updateNote={updateNote} notes={notes} />
                    })}
                </div>
            </div>
        </>


    )
}
