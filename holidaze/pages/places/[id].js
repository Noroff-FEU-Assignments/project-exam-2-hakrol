import Head from "../../components/layout/Head";
import Heading from "../../components/layout/Heading";
import axios from "axios";
import { base_url, places_url } from "../../constants/api";
import Layout from "../../components/layout/Layout";

function Place( {place} ) {
    return (
        <>
        <Head title="Holidaze" />
        <Layout>
            <div className="px-2 content">
                <Heading h1={place.title} />
                <p>{place.description}</p>
            </div>
        </Layout>
        </>
    )
}

export default Place

export async function getStaticPaths () {
    try {
        const response = await axios.get(places_url);

        const places = response.data;

        console.log(places);

        const paths = places.map((place) => ({
            params: { id: place.id.toString() },
        }));

        return {paths: paths, fallback: false};

    } catch(error) {
        console.log(error);
    }

}

export async function getStaticProps( {params} ) {

    const url = `${places_url}/${params.id}`;

    let place = "";

    try {
        const response = await axios.get(url);

        console.log(response.data[0]);

        place = response.data;
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            place: place,
        },
    };
}