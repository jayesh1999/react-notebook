import React, { useContext,useState } from 'react'
import noteContext from "../context/notes/noteContext"
    
const AddNote = ()  =>{
    const context = useContext(noteContext);
    const {addNote } = context;

    const [note, setNote] = useState({title:"",description:"" ,tag:""})

    const handleClick =(e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"" ,tag:""})
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <div>
             <div className="container my-3">
                <h2 className="">Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control"  minLength={5} required id="title" name='title' value ={note.title} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control"  minLength={5} required id="description" value={note.description} name="description" onChange={onChange}/>
                    </div>
                  <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">tag</label>
                        <input type="text" className="form-control"  minLength={5} required   id="tag" value={note.tag} name="tag" onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
export default AddNote;