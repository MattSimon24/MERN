import { Container } from 'react-bootstrap';
import styles from "../styles/NotesPage.module.css";
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotePageLoggedOutView from '../components/NotesPageLoggedOutView';
import { User } from '../models/user';

type NotesPageProps = {
    loggedInUser: User | null
}

const NotesPage = ({loggedInUser}:NotesPageProps) => {
    return ( 
        <Container className={styles.notesPage}>
        {loggedInUser ? <NotesPageLoggedInView/> : <NotePageLoggedOutView/>}
      </Container>

     );
}
 
export default NotesPage;