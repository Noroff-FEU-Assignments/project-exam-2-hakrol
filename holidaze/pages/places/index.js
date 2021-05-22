import Head from "../../components/layout/Head";
import Heading from "../../components/layout/Heading";
import Layout from "../../components/layout/Layout";
import ListPlaces from "../../components/places/ListPlaces";

export default function Places() {
    return (
        <>
            <Head title="Places" />
            <Layout>
                <div className="bg-places">
                    <div className="px-2 content">
                        <Heading h1="Places" />
                        <ListPlaces />
                    </div>
                </div>
            </Layout>
        </>
    );
}
