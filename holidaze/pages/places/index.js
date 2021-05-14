import Head from "../../components/layout/Head";
import Heading from "../../components/layout/Heading";
import Layout from "../../components/layout/Layout";
import SearchablePlaces from "../../components/layout/SearchablePlaces";


export default function Places() {

    return (
        <>
        <Head title="Places" />
        <Layout>
            <div className="bg-places">
                <div className="px-2 content">
                    <Heading h1="Places" />
                    <SearchablePlaces />
                </div>
            </div>
        </Layout>
        </>
    )
}