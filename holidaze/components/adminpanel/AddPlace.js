import * as yup from "yup";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ValidationError from "../form/common/ValidationError";
import ValidationSuccess from "../form/common/ValidationSuccess";

const schema = yup.object().shape({
    title: yup.string().required("Title is missing."),
    description: yup
        .string()
        .min(10, "The description must be at least 10 characters"),
});

export default function AddPlace() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const http = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);
        setSubmitted(false);
        console.log(data.files[0]);

        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                title: data.title,
                price: data.price,
                description: data.description,
            })
        );
        formData.append("files.image", data.files[0]);

        data.status = "publish";

        console.log(data);

        try {
            const response = await http.post("/places", formData);
            console.log("response", response.data);
        } catch (error) {
            console.log("error", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
            setSubmitted(true);
        }
    }

    return (
        <>
            <h2>Add new place</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {serverError ? (
                    <ValidationError>{serverError}</ValidationError>
                ) : (
                    ""
                )}
                {submitted ? (
                    <ValidationSuccess>
                        <p>Place successfully added!</p>
                    </ValidationSuccess>
                ) : (
                    ""
                )}
                <Form.Group controlId="title">
                    <Form.Control
                        name="title"
                        placeholder="Title.."
                        {...register("title")}
                    />
                    {errors.title && (
                        <ValidationError>
                            {errors.title.message}
                        </ValidationError>
                    )}
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Description.."
                        rows={3}
                        {...register("description")}
                    />
                    {errors.description && (
                        <ValidationError>
                            {errors.description.message}
                        </ValidationError>
                    )}
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Price.."
                        rows={3}
                        {...register("price")}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.File
                        type="file"
                        name="files"
                        id="file"
                        label="Choose an image"
                        {...register("files")}
                        required
                    />
                    <p className="explainer-text">
                        Important! Aspect ratio should be 900x600.
                    </p>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {submitting ? "Adding.." : "Add"}
                </Button>
            </Form>
        </>
    );
}
