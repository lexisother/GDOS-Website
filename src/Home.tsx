import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import Page from "./shared/Page";

export default function HomePage(): JSX.Element {
    return (
        <Page>
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
            {/* TODO: Write a short pitch */}
            <div className="mainContent">
                <p>Dit is de home-pagina van Gilde DevOps Solutions.</p>
            </div>
        </Page>
    );
}
