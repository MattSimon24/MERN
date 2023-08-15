import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { Note } from "../models/note.ts";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api.ts";
import * as NotesApi from "../network/notes_api.ts";


type AddEditNoteDialogProps = {
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
    noteToEdit?: Note,
}

const AddEditNoteDialog = ({ onDismiss, onNoteSaved, noteToEdit }: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });
    const onSubmit = async (input: NoteInput) => {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(input, noteToEdit._id)
            } else {
                noteResponse = await NotesApi.createNote(input);
            }

            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <ModalTitle>
                    {noteToEdit ? 'Update Note' : 'Add Note' }
                </ModalTitle>
            </Modal.Header>

            <ModalBody>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register('title', { required: "Required" })}
                        />
                        <FormControl.Feedback type="invalid">
                            {errors.title?.message}
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Text</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register('text')}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddEditNoteDialog;