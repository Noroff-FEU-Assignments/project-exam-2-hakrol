import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import ValidationError from "./common/ValidationError";
import ValidationSuccess from "./common/ValidationSuccess";

import { base_url, messages_url } from "../../constants/api";
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup
        .string()
        .required("Please enter an email address")
        .email("Please enter a valid email address"),
    Message: yup
        .string()
        .required("Please enter your message")
        .min(2, "The message must be at least 2 characters"),
});

function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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
            const response = axios.post(messages_url, data);
            console.log(response.data);
        } catch (error) {
            console.log("error", error);
        } finally {
            setSubmitting(false);
            setSubmitted(true);
            document.querySelector(".form-contact").reset();
        }
    }

    return (
        <Form className="form-contact" onSubmit={handleSubmit(onSubmit)}>
            {submitted ? (
                <ValidationSuccess>
                    <p>
                        Message sent! Thank you, we will get in touch with you
                        as soon as possible.
                    </p>
                </ValidationSuccess>
            ) : (
                ""
            )}
            <Form.Group controlId="Name">
                <Form.Control
                    type="text"
                    required
                    placeholder="Name.."
                    {...register("name")}
                />
                {errors.name && (
                    <ValidationError>{errors.name.message}</ValidationError>
                )}
            </Form.Group>

            <Form.Group controlId="Email">
                <Form.Control
                    type="email"
                    required
                    placeholder="Email.."
                    {...register("email")}
                />
                {errors.email && (
                    <ValidationError>{errors.email.message}</ValidationError>
                )}
            </Form.Group>

            <Form.Group controlId="Message">
                <Form.Control
                    as="textarea"
                    required
                    placeholder="Message.."
                    rows={3}
                    {...register("Message")}
                />
                {errors.Message && (
                    <ValidationError>{errors.Message.message}</ValidationError>
                )}
            </Form.Group>

            <Button variant="primary" type="submit">
                Send
            </Button>
        </Form>
    );
}

export default ContactForm;
