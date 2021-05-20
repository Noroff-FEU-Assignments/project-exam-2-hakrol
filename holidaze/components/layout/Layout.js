import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout({ children }) {
    return (
        <div className="container">
            <Navigation />
            <div>{children}</div>
            <Footer />
        </div>
    );
}
