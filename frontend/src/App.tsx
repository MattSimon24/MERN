
import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note';
import './App.css'
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/Utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';
import {FaPlus} from "react-icons/fa"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

const deleteNote =async (note: NoteModel) => {
  try {
    await NotesApi.deleteNote(note._id);
    setNotes(notes.filter(existingNote => existingNote._id !== note._id))
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

  return (
    <>
      <Container>
        <Button className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)} >
          <FaPlus />

          
        </Button>
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map(note => (
            <Col key={note._id}>
              <Note note={note} className={styles.note} onDeleteNoteClicked={deleteNote}/>
            </Col>
          ))}

        </Row>
        {
        showAddNoteDialog ? 
        <AddNoteDialog onDismiss={() => setShowAddNoteDialog(false)} 
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false);
          }} 
          />
          : null
        }
      </Container>
    </>
  )
}

export default App
