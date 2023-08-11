import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api.ts";


type AddNoteDialogProps = {
   onDismiss: () => void,
   onNoteSaved: (note: Note)=> void,  
}

const AddNoteDialog  = ({onDismiss, onNoteSaved}: AddNoteDialogProps) => {
    
    const { register, handleSubmit, formState : {errors, isSubmitting} } = useForm<NoteInput>();
    const onSubmit = async (input:NoteInput) => {
        try {
            const noteResponse = await NotesApi.createNote(input);
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
                    Add Note
                </ModalTitle>
            </Modal.Header>

            <ModalBody>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl
                        type="text"
                        placeholder="Title"
                        isInvalid = {!!errors.title}
                        { ...register('title', { required: "Required"})}
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
                        { ...register('text')}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" form = "addNoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
      );
}
 
export default AddNoteDialog;