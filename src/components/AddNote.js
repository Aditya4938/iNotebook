import React,{useContext} from 'react'
import { useState } from 'react';
import noteContext from "../Context/Notes/noteContext";

export default function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const[note,setNote]=useState({title:"",description:"",tag:"default"})
    const addNewNote=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={addNewNote}>Add Note</button>
            </form>
            </div>
    </>
  )
}