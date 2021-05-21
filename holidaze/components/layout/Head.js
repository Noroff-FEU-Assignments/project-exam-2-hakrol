import NextHead from "next/head";

export default function Head({ title = "" }) {
    return (
        <NextHead>
            <title>{title}</title>
            <meta
                name="keywords"
                content="Bergen holiday vacation hotel bed&breakfast"
            />
        </NextHead>
    );
}
