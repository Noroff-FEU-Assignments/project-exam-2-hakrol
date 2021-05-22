import Head from "../../components/layout/Head";
import Heading from "../../components/layout/Heading";
import axios from "axios";
import { base_url, places_url, enquires_url } from "../../constants/api";
import Layout from "../../components/layout/Layout";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ValidationSuccess from "../../components/form/common/ValidationSuccess";
import { FaArrowAltCircleRight } from "react-icons/fa";

function Place({ place }) {
    const [modalShow, setModalShow] = useState(false);
    const [confirmationModalShow, setConfirmationModalShow] = useState(false);

    const schema = yup.object().shape({
        Name: yup.string().required("Please enter your name"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        console.log(data);

        try {
            const response = axios.post(enquires_url, data);
            console.log("response", response.data);
            console.log;
        } catch (error) {
            console.log("error", error);
        } finally {
            console.log("Finally");
            setModalShow(false);
            setConfirmationModalShow(true);
        }
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h1>Booking form</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="Place">
                            <Form.Label>You about to book</Form.Label>
                            <Form.Control
                                type="text"
                                name="Place"
                                value={place.title}
                                {...register("Place")}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Whats your name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                placeholder="Your name..."
                                {...register("Name")}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Email">
                            <Form.Label>Your email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email.."
                                {...register("Email")}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="Guests">
                            <Form.Label>How many guests</Form.Label>
                            <Form.Control
                                as="select"
                                {...register("Guests")}
                                required
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Checkin">
                            <Form.Label>When do you want to arrive</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Your name..."
                                {...register("Checkin")}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="Checkin">
                            <Form.Label>When do you want to leave</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Your name..."
                                {...register("Checkout")}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Book it!
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    function ConfirmationModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <ValidationSuccess>
                        <p>
                            Booking complete! We will send you a confirmation
                            mail to confirm your stay.
                        </p>
                    </ValidationSuccess>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const image_url = place.image[0].url;
    console.log(image_url);

    return (
        <>
            <Head title="Holidaze" />
            <Layout>
                <div className="bg-place">
                    <div className="px-2 content place">
                        <Heading
                            h1={place.title}
                            className="m-auto place__heading"
                        />
                        <div>
                            <img
                                className="place__header-image"
                                src={image_url}
                                alt="My image"
                            />
                        </div>
                        <Button
                            className="place__button"
                            onClick={() => setModalShow(true)}
                        >
                            <FaArrowAltCircleRight />
                            Book now!
                        </Button>
                        <div className="place__information-container">
                            <p className="place__price">
                                Each night: {place.price} NOK
                            </p>
                            <div className="place__description">
                                <p>{place.description}</p>
                            </div>
                        </div>
                    </div>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <ConfirmationModal
                        show={confirmationModalShow}
                        onHide={() => setConfirmationModalShow(false)}
                    />
                </div>
            </Layout>
        </>
    );
}

export default Place;

export async function getStaticPaths() {
    try {
        const response = await axios.get(places_url);

        const places = response.data;

        console.log(places);

        const paths = places.map((place) => ({
            params: { id: place.id.toString() },
        }));

        return { paths: paths, fallback: false };
    } catch (error) {
        console.log(error);
    }
}

export async function getStaticProps({ params }) {
    const url = `${places_url}/${params.id}`;

    let place = "";

    try {
        const response = await axios.get(url);

        console.log(response.data[0]);

        place = response.data;
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            place: place,
        },
    };
}
