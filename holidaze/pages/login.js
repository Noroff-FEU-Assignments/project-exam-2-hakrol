import Head from "../components/layout/Head";
import Heading from "../components/layout/Heading";
import LoginForm from "../components/form/LoginForm";

function login() {
    return (
		<>
			<Head title="Login" />
			<Heading h1="Login" />
			<LoginForm />
		</>
    )
}

export default login
