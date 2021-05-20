import Head from "../components/layout/Head";
import Hero from "../components/layout/Hero";
import Layout from "../components/layout/Layout";

export default function Home() {
    return (
        <>
            <Head title="Holidaze" />
            <Layout>
                <Hero />
                <div className="bg-home" />
            </Layout>
        </>
    );
}
