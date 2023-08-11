import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import {MdDelete} from "react-icons/md";


type NoteProps = {
    note: NoteModel,
    onDeleteNoteClicked: (note:NoteModel) => void,
    className?: string
}

const Note = ({ note, className,  onDeleteNoteClicked }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    return (
        <>
            <Card className={`${styles.noteCard} ${className}`}>
                <Card.Body className={styles.cardBody}>
                    <Card.Title className={styleUtils.flexCenter}>
                        {title}
                        <MdDelete 
                            className='text-muted ms-auto'
                            onClick={(e:MouseEvent)=>{
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}/>
                    </Card.Title>
                    <Card.Text className={styles.cardText}>
                        {text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    {(updatedAt > createdAt) ? `Updated: ${formatDate(updatedAt)}` : `Created: ${formatDate(createdAt)}`}
                </Card.Footer>
            </Card>
        </>
    )
}

export default Note;