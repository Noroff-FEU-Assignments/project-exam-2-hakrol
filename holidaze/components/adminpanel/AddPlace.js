import * as yup from "yup";
import { useRouter } from 'next/router';
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../layout/Heading";
import MediaImport from "./media/MediaImport";
import axios from "axios";

// form
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
    description: yup.string().required("You need to add a description").min(1, "The description must be at least 20 characters"),
});

export default function AddPlace() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
	const [file, setFile] = useState(null);


    const router = useRouter();
    const http = useAxios();

    const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

    async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);
		setFile(data.files[0]);
		
		const formData = new FormData()
		formData.append("data", JSON.stringify({title: data.title, description: data.description}));
		formData.append("files.image", file);

		// const response = await http.post("/places", formData);

		// const uploadableData = {title: data.title, description: data.description, image: data.files[0]};

		data.status = "publish";		

		console.log(data);


		try {
			const response = await http.post("/places", formData);
			console.log("response", response.data);
			// router.push("/places");
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
                    <Form.Control as="textarea" name="description" placeholder="Description.." rows={3} {...register("description")}/>
                </Form.Group>
				<Form.Group>
					<Form.File type="file" name="files" id="file" label="Choose an image" {...register("files")} />
				</Form.Group>
                <Button variant="primary" type="submit">
                    {submitting ? "Adding.." : "Add"}
                </Button>
			</Form>
        </>
	);
}