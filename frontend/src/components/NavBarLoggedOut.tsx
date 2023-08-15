import { Button } from "react-bootstrap";

type NavBarLoggedOutProps = {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOut = ({onLoginClicked,onSignUpClicked}:NavBarLoggedOutProps) => {
    return ( 
        <>
        <Button onClick={onSignUpClicked}>Sign Up</Button>
        <Button onClick={onLoginClicked}>Login</Button>
        </>
     );
}

export default NavBarLoggedOut;