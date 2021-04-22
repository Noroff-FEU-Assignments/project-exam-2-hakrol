import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout({ children }) {
	return (
			<div className="container">
				<Navigation />
				<div className="content">
					{children}
				</div>
				<Footer />
			</div>
	);
}