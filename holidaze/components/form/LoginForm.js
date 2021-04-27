import { base_url, token_url } from "../../constants/api";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

// Internal components
import ValidationError from "./common/ValidationError";



const auth_url = base_url + token_url;
console.log(auth_url);

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        // console.log(data);

        try {
			const response = await axios.post(auth_url, data);
			console.log(response.data);
		} catch (error) {
			console.log("error", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)} id="loginform">
            {loginError && <ValidationError>{loginError}</ValidationError>}
            <Form.Group controlId="username">
                <Form.Control name="username" className="test" type="text" placeholder="Username.." {...register("username")}/>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Control name="password" type="text" placeholder="Password.." {...register("password")}/>
            </Form.Group>

            <Button id="loginform_button" variant="primary" type="submit">
            {submitting ? "Logging in..." : "Login"}
            </Button>
        </Form>
    )
}