import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { FaSignOutAlt } from "react-icons/fa";

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
                        <NavLink
                            href="/"
                            className={
                                router.pathname == "/"
                                    ? "active nav-link"
                                    : "nav-link"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            href="/places"
                            className={
                                router.pathname == "/places"
                                    ? "active nav-link"
                                    : "nav-link"
                            }
                        >
                            Places
                        </NavLink>
                        <NavLink
                            href="/contact"
                            className={
                                router.pathname == "/contact"
                                    ? "active nav-link"
                                    : "nav-link"
                            }
                        >
                            Contact
                        </NavLink>
                        {auth ? (
                            <>
                                <NavLink
                                    href="/admin"
                                    className={
                                        router.pathname == "/admin"
                                            ? "active nav-link"
                                            : "nav-link"
                                    }
                                >
                                    Admin
                                </NavLink>
                                <Button
                                    className="logout-button"
                                    size="sm"
                                    onClick={logout}
                                >
                                    Log out
                                    <FaSignOutAlt size={20} />
                                </Button>
                            </>
                        ) : (
                            <NavLink
                                href="/login"
                                className={
                                    router.pathname == "/login"
                                        ? "active nav-link"
                                        : "nav-link"
                                }
                            >
                                Login
                            </NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;
