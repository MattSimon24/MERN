
import { Container } from 'react-bootstrap';
import './App.css';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import styleUtils from "./styles/Utils.module.css";
import { useEffect, useState } from "react";
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotePageLoggedOutView from './components/NotesPageLoggedOutView';

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<User|null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);        
      }
    }
    fetchLoggedInUser();
  },[])

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />
      <Container className={styleUtils.notesPage}>
        {loggedInUser ? <NotesPageLoggedInView/> : <NotePageLoggedOutView/>}
        {showSignUpModal &&
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user)
              setShowSignUpModal(false)}}
          />
        }
        {showLoginModal &&
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)}}
          />
        }
      </Container>
    </>
  )
}

export default App
