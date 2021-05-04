import Head from "../../components/layout/Head";
import Heading from "../../components/layout/Heading";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { base_url, places_url } from "../../constants/api";
import Link from 'next/link'
import Layout from "../../components/layout/Layout";

export default function Places(props) {

    return (
        <>
        <Head title="Places" />
        <Layout>
            <div className="px-2 content">
                <Heading h1="Places" />
                <div className="list">
                    {props.places.map((place) => {

                        console.log(place);
                        // console.log("http://localhost:1337" + place.image[0].url)

                        // let image_url = "/assets/noimage.png";
                        // if (place.image == undefined) {
                        //     image_url = "/assets/noimage.png";
                        // } else {
                        const image_url = base_url + place.image[0].url;

                        // const image_url = base_url + place.image[0].url;
                        // }
                        // const image_url = "/assets/noimage.png";
                        // const image_url = base_url + place.image[0].url;

                        // (place.image[0] = undefined) && (image_url = place.image[0].url);

                        // console.log(place.image);

                        // console.log(place);

                        return  <div className="list_card" key={place.id}>
                                    <img src={image_url} width="300" height="200" alt="My image" />
                                    <h4>{place.title}</h4> 
                                    <p>{place.description}</p>  
                                    <Link href={`places/${place.id}`}><Button variant="primary">Click</Button></Link>             
                                </div>;
                    })}

                </div>

            </div>
        </Layout>
        </>
    )
}

export async function getStaticProps() {

    let places = [];

    try {
        const response = await axios.get(places_url);

        console.log(response.data[0]);

        places = response.data;
    } catch(error) {
        console.log(error)
    }

    return {
        props: {
            places: places,
        },
    };
}