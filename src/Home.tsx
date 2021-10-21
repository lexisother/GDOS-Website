import React from "react";
import {graphql} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";
import {Trans} from "gatsby-plugin-react-i18next";
import Page from "./shared/Page";

export const query = graphql`
    query ($language: String!) {
        locales: allLocale(filter: {ns: {in: ["main"]}, language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

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
                <Trans>This is the home-page of Gilde DevOps Solutions.</Trans>
            </div>
        </Page>
    );
}
