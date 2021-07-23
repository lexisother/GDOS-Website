import React from "react";
import Helmet from "react-helmet";
import "../css/index.scss";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string[];
    imageUrl?: string;
}
function Meta({title, description, keywords}: MetaProps): JSX.Element {
    const defaults = {
        title: "Tenplate",
        description: "Template"
    };

    const actual = {
        title: title ? `${title} | ${defaults.title}` : defaults.title,
        description: description || defaults.description,
        keywords: keywords?.join(", ")
    };
    return (
        <Helmet>
            <html lang="en" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>{actual.title}</title>

            <meta name="description" content={actual.description} />
            {actual.keywords && <meta name="keywords" content={actual.keywords} />}

            <meta property="og:type" content="website" />
            <meta property="og:title" content={actual.title} />
            <meta property="og:description" content={actual.description} />

            <meta name="twitter:title" content={actual.title} />
            <meta name="twitter:site" content="@lexisother" />
            <meta name="twitter:creator" content="@lexisother" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={actual.description} />
        </Helmet>
    );
}

interface PageProps extends MetaProps {
    children: React.ReactNode;
}
const Page = ({children, ...props}: PageProps): JSX.Element => {
    return (
        <div className="page-container">
            <Meta {...props} />

            <main>{children}</main>
        </div>
    );
};

export default Page;
