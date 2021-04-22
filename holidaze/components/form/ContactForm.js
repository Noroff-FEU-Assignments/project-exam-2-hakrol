// External components
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

// Internal components
import ValidationError from "./common/ValidationError";




const schema = yup.object().shape({
	name: yup.string().required("Please enter your name"),
	email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
	message: yup.string().required("Please enter your message").min(10, "The message must be at least 10 characters"),
});

function ContactForm() {

    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

	function onSubmit(data) {
		console.log(data);
        setSubmitted(true);
	}



    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {submitted && <Alert variant="success">Thanks! Your message was sent.</Alert>}
            <Form.Group controlId="Name">
                <Form.Control type="text" placeholder="Name.." {...register("name")}/>
                {errors.name && <ValidationError>{errors.name.message}</ValidationError>}
            </Form.Group>

            <Form.Group controlId="Email">
                <Form.Control type="email" placeholder="Email.." {...register("email")}/>
                {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
            </Form.Group>

            <Form.Group controlId="Message">
                <Form.Control as="textarea" placeholder="Message.." rows={3} {...register("message")}/>
                {errors.message && <ValidationError>{errors.message.message}</ValidationError>}
            </Form.Group>

            <Button variant="primary" type="submit">
            Send
            </Button>
        </Form>
    );
}

export default ContactForm
