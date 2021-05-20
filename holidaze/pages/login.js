import Head from "../components/layout/Head";
import Heading from "../components/layout/Heading";
import LoginForm from "../components/form/LoginForm";
import Layout from "../components/layout/Layout";

function Login() {
    return (
        <>
            <Head title="Login" />
            <Layout>
                <div className="bg-login">
                    <div className="px-2 content">
                        <Heading h1="Login" />
                        <LoginForm />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login;
