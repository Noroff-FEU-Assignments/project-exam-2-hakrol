import Head from "../components/layout/Head";
import Hero from "../components/layout/Hero";
import Layout from "../components/layout/Layout";

export default function Home() {
	// console.log(auth);
	return (
		<>
			<Head title="Holidaze" />
			<Layout>
				<Hero />
				<div className="px-2 content">
					Hello
				</div>
			</Layout>
		</>
	);
}