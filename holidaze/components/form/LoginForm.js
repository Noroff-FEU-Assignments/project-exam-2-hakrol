import { base_url, token_url } from "../../constants/api";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";

import ValidationError from "./common/ValidationError";
import AuthContext from "../../context/AuthContext";

const auth_url = base_url + token_url;

console.log(auth_url);

const schema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const [auth, setAuth] = useContext(AuthContext);

    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        console.log(data.username);
        console.log(data.password);

        const auth_data = {
            identifier: data.username,
            password: data.password,
        };

        try {
            const response = await axios.post(auth_url, auth_data);
            console.log("response", response.data);
            setAuth(response.data.jwt);
            router.push("/admin");
        } catch (error) {
            console.log("error", error);
            setLoginError("Something went wrong! Try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} className="form-login">
                {loginError && <ValidationError>{loginError}</ValidationError>}
                <Form.Group controlId="username">
                    <Form.Control
                        name="username"
                        placeholder="Username.."
                        {...register("username")}
                    />
                    {errors.username && (
                        <ValidationError>
                            {errors.username.message}
                        </ValidationError>
                    )}
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password.."
                        {...register("password")}
                    />
                    {errors.password && (
                        <ValidationError>
                            {errors.password.message}
                        </ValidationError>
                    )}
                </Form.Group>

                <Button id="loginform_button" variant="primary" type="submit">
                    {submitting ? "Logging in..." : "Login"}
                </Button>
            </Form>
        </>
    );
}
