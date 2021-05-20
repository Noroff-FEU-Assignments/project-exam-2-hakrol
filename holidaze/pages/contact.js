import ContactForm from "../components/form/ContactForm";
import Head from "../components/layout/Head";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";

function Contact() {
    return (
        <>
            <Head title="Holidaze" />
            <Layout>
                <div className="bg-contact">
                    <div className="px-2 content">
                        <Heading h1="Contact" />
                        <ContactForm />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Contact;
