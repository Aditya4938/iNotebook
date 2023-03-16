import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
export default function Notes() {
  let navigate=useNavigate();
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
        navigate('/login')
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})

  };
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}
const handleClick = (e)=>{
  console.log("Updating the note...", note)
  editNote(note.id,note.etitle,note.edescription,note.etag);
  ref.current.click(); 
}
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{"display":"none"}}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>

            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h3>Your Notes</h3>

        <div className="row">
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
}
