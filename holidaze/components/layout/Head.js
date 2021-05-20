import NextHead from "next/head";

export default function Head({ title = "" }) {
    return (
        <NextHead>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="keywords" content="Bergen holiday" />
        </NextHead>
    );
}
