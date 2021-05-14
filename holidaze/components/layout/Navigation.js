import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import { useRouter } from 'next/router';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../../pages";
import Admin from "../../pages/admin";
import Contact from "../../pages/contact";
import Places from "../../pages/places";


function Navigation() {

    const [auth, setAuth] = useContext(AuthContext);

    const router = useRouter();

    function logout() {
        setAuth(null);
        router.push("/");
    }

    return (
        <div className="navbar-background">
            <Navbar expand="lg" variant="dark">
                <Navbar.Brand href="/">Holidaze</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                        <NavLink href="/places">Places</NavLink>
                        {auth ? (
                            <>
                                <NavLink href="/admin">Admin</NavLink>
                                <Button size="sm" onClick={logout}>Log out</Button>
                            </>
                        ) : (
                            <NavLink href="/login">Login</NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation
