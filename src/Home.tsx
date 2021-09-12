import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {StaticImage} from "gatsby-plugin-image";
import Page from "./shared/Page";

export default function HomePage(): JSX.Element {
    const markdown = `Dit is de home-pagina van Gilde DevOps Solutions.

TODO:
* [x] Markdown rendering (evt blog-posts)
* [x] CSV parsing voor [members](/members)
* [ ] Windows tutorial?
* [ ] MySQL database voor [members](/members)
`;

    return (
        <Page>
            <h1>Home</h1>
            <figure className="avatar">
                <StaticImage
                    className="logo"
                    src="./images/logo.png"
                    width={500}
                    height={128}
                    placeholder="blurred"
                    alt="Gilde DevOps Solutions logo"
                />
            </figure>
            <hr />
            <Markdown children={markdown} plugins={[remarkGfm as any]} />
        </Page>
    );
}
