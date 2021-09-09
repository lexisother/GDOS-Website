import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import Page from "./shared/Page";

export default function HomePage(): JSX.Element {
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
            <div>
                <p>Temp</p>
            </div>
        </Page>
    );
}
