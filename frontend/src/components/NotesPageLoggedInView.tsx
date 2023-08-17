import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from "./Note";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/Utils.module.css";

const NotesPageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    const [showNotesLoading, setShowNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                setShowNotesLoadingError(false);
                setShowNotesLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);

            } finally {
                setShowNotesLoading(false);
            }
        }
        loadNotes();
    }, []);

    const deleteNote = async (note: NoteModel) => {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const notesGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {notes.map(note => (
                <Col key={note._id}>
                    <Note note={note} className={styles.note} onNoteClicked={() => setNoteToEdit(note)} onDeleteNoteClicked={deleteNote} />
                </Col>
            ))}

        </Row>

    return (
        <>
            <Button className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)} >
                <FaPlus />
                Add new note

            </Button>
            {showNotesLoading && <Spinner animation='border' variant='primary' />}
            {showNotesLoadingError && <p>Something went wrong</p>}
            {!showNotesLoadingError && !showNotesLoadingError &&
                <>
                    {notes.length > 0 ? notesGrid : <p>You don't have notes yet</p>}
                </>
            }

            {
                showAddNoteDialog ?
                    <AddEditNoteDialog onDismiss={() => setShowAddNoteDialog(false)}
                        onNoteSaved={(newNote) => {
                            setNotes([...notes, newNote])
                            setShowAddNoteDialog(false);
                        }}
                    />
                    : null
            }
            {
                noteToEdit ?
                    <AddEditNoteDialog
                        noteToEdit={noteToEdit}
                        onDismiss={() => setNoteToEdit(null)}
                        onNoteSaved={(updatedNote) => {
                            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
                            setNoteToEdit(null);
                        }
                        }
                    />
                    : null
            }
        </>
    );
}

export default NotesPageLoggedInView;