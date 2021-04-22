import ContactForm from "../components/form/ContactForm";
import Head from "../components/layout/Head"
import Heading from "../components/layout/Heading";


function Contact() {
    return (
        <>
            <Head title="Holidaze" />
            <Heading h1="Contact" />
            <ContactForm />
        </>
    )
}

export default Contact
