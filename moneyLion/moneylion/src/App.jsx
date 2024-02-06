
import './App.css'
import React, { useState, useEffect } from 'react';

function NotesApp() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = { title, status };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setTitle("");
    setStatus("");
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredNotes = filter === "All" ? notes : notes.filter(note => note.status === filter);

  return (
    <div className="layout-column align-items-center justify-content-start">
      <form > 
<label>Title</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
       
      /> 
      <label>Status</label>
      <input 
        type="text" 
        onChange={(e) => setStatus(e.target.value)} 
        value={status}
       
      /> 
<button onClick={handleSubmit}>Submit</button>

      </form>
      <ul className="tabs">
        <li className={`tab-item slide-up-fade-in ${filter === "All" ? "active" : ""}`} data-testid="allButton" onClick={() => handleFilter("All")}>All</li>
        <li className={`tab-item slide-up-fade-in ${filter === "Active" ? "active" : ""}`} data-testid="activeButton" onClick={() => handleFilter("Active")}>Active</li>
        <li className={`tab-item slide-up-fade-in ${filter === "Completed" ? "active" : ""}`} data-testid="completedButton" onClick={() => handleFilter("Completed")}>Completed</li>
      </ul>
      {/* ... */}
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">
            {filteredNotes.map((note, index) => (
              <tr key={index}>
                <td>{note.title}</td>
                <td>{note.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp;
