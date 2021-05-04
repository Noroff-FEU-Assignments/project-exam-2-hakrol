import Footer from "./Footer";
import Navigation from "./Navigation";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import { useRouter } from 'next/router';

export default function Layout({ children }) {

	const [auth, setAuth] = useContext(AuthContext);

    const router = useRouter();

    function logout() {
        setAuth(null);
        router.push("/");
    }

	return (
			<div className="container">
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<NavLink href="/">Home</NavLink>
							<NavLink href="/contact">Contact</NavLink>
							<NavLink href="/places">Places</NavLink>
							{auth ? (
								<>
									<NavLink href="/admin">Admin</NavLink>
									<Button onClick={logout}>Log out</Button>
								</>
							) : (
								<NavLink href="/login">Login</NavLink>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<div>
					{children}
				</div>
				<Footer />
			</div>
	);
}