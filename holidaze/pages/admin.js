import Head from "../components/layout/Head";
import Heading from "../components/layout/Heading";
import AdminPanel from "../components/layout/AdminPanel";
import Layout from "../components/layout/Layout";

function Admin() {
    return (
        <>
            <Head title="Holidaze" />
            <Layout>
                <div className="bg-admin">
                    <div className="px-2 content">
                        <Heading h1="Admin" />
                        <AdminPanel />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Admin;
