import { Container, Nav, NavLink, Navbar, NavbarBrand } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { User } from "../models/user";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";
import { Link } from "react-router-dom";


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
                <NavbarBrand as={Link} to={'/'}>
                    Notes App
                </NavbarBrand>
                <NavbarToggle aria-controls="main-navbar"/>
                <NavbarCollapse id="main-navbar">
                    <Nav>
                       <NavLink as={Link} to={'/privacy'}>
                        Privacy
                       </NavLink>
                    </Nav>
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