import { Button, Form, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { Note } from "../models/note.ts";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api.ts";
import * as NotesApi from "../network/notes_api.ts";
import TextInputField from "./form/TextInputField.tsx";


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
                    {noteToEdit ? 'Update Note' : 'Add Note'}
                </ModalTitle>
            </Modal.Header>

            <ModalBody>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name='title'
                        label='Title'
                        type='text'
                        placeholder='Title'
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.title}
                    />
                    <TextInputField
                        name='text'
                        label='Text'
                        as='textarea'
                        placeholder='Text'
                        rows={5}
                        register={register}

                    />

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