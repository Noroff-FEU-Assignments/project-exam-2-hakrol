import * as yup from "yup";
import { useRouter } from 'next/router';
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../layout/Heading";

// form
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
    description: yup.string().required("You need to add a description").min(20, "The description must be at least 20 characters"),
});

export default function AddPlace() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);


    const router = useRouter();
    const http = useAxios();

    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

    async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);

		data.status = "publish";

		console.log(data);

		try {
			const response = await http.post("/places", data);
			console.log("response", response.data);
			router.push("/admin");
		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
        <>
			<Heading content="Add post" />
			<Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="title">
                    <Form.Control name="title" placeholder="Title.." {...register("title")}/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Control as="textarea" placeholder="Description.." rows={3} {...register("description")}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {submitting ? "Adding.." : "Add"}
                </Button>
			</Form>
        </>
	);
}