import React, {useState} from "react";
import {graphql} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";
import {Trans} from "gatsby-plugin-react-i18next";
import Modal from "react-modal";
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
    // Set up hooks for the ModalVideo.
    const [isOpen, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(!isOpen);
    };

    return (
        <Page>
            <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="video">
                <video width="320" height="240" controls>
                    <source src="https://nova-vps.ml/~alyxia/static/bedrijf.webm" type="video/webm" />
                </video>
            </Modal>

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
                <div
                    style={{
                        marginTop: "3rem",
                        marginRight: "15rem",
                        marginLeft: "15rem",
                        borderRadius: "10px",
                        backgroundColor: "cornflowerblue",
                        cursor: "pointer"
                    }}
                    onClick={toggleModal}
                >
                    <b>
                        <em>
                            <Trans>Introductory Video</Trans>
                        </em>
                    </b>
                </div>
            </div>
        </Page>
    );
}
