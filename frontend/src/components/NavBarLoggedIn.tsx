import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { Button, Navbar } from "react-bootstrap";

type NavBarLoggedInProps = {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedIn = ({user, onLogoutSuccessful}: NavBarLoggedInProps) => {
    
    const logout = async () => {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            alert(error);
            console.error(error)        
        }
    }

    return ( 
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
     );
}
 
export default NavBarLoggedIn;