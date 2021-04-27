import Head from "../components/layout/Head";
import Heading from "../components/layout/Heading";

export default function Home() {
	return (
		<>
			<Head title="Holidaze" />
			<div className="hero_image">
				<Heading h1="Home" />
			</div>
		</>
	);
}