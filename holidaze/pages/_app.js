import "../styles/globals.scss";
import { AuthProvider } from "../context/AuthContext";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/index";
import Contact from "../pages/contact";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
