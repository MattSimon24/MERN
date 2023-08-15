import { Container, Navbar, NavbarBrand, Nav } from "react-bootstrap";
import { User } from "../models/user";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";


type NavBarProps = {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,     
}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful}: NavBarProps) => {
    
    return ( 
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <NavbarBrand>
                    Notes App
                </NavbarBrand>
                <NavbarToggle aria-controls="main-navbar"/>
                <NavbarCollapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser ? 
                            <NavBarLoggedIn user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/> 
                            : 
                            <NavBarLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
                            }
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
     );
}



export default NavBar;