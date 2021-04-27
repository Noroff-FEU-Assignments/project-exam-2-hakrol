import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

function Navigation() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                    <NavLink href="/login">Login</NavLink>
                    <NavLink href="/places">Places</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
