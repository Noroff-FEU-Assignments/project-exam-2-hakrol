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
				<Navigation />
				<div>
					{children}
				</div>
				<Footer />
			</div>
	);
}