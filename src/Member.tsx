import {graphql} from "gatsby";
import {Trans} from "gatsby-plugin-react-i18next";
import ModalVideo from "react-modal-video";
import React, {useState} from "react";
import Page from "./shared/Page";

export const query = graphql`
    query ($language: String!) {
        locales: allLocale(filter: {ns: {in: ["common", "member"]}, language: {eq: $language}}) {
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

interface MemberPageProps {
    pageContext: {
        member: GatsbyTypes.MembersXlsx__Sheet1;
    };
}
export default function MemberPage({pageContext}: MemberPageProps): JSX.Element {
    const member = {
        name: pageContext.member.Name,
        age: pageContext.member.DoB,
        role: pageContext.member.Role,
        education: pageContext.member.Education,
        officenum: pageContext.member.OfficeNum,
        email: pageContext.member.Email,
        phone: pageContext.member.Phone!.toString(),
        hobbys: pageContext.member.Hobbys,
        favcolour: pageContext.member.FavColour,
        pet: pageContext.member.Pet
    };

    // Such disgusting preprocessing.
    member.phone = `+31 0${member.phone}`;

    // Get the current URL, and replace everything that isn't the member name
    // with nothing.
    const memberNameFromURL = document.baseURI.replace(/.*\//, "");

    // Set up hooks for the ModalVideo.
    const [isOpen, setOpen] = useState(false);

    return (
        <Page title={member.name}>
            <ModalVideo
                channel="custom"
                autoplay
                isOpen={isOpen}
                url={`https://nova-vps.ml/~alyxia/static/${memberNameFromURL}.mp4`}
                onClose={() => setOpen(false)}
            />

            <div className="section-header">{member.name}</div>

            <div className="entry" onClick={() => setOpen(true)} style={{cursor: "pointer"}}>
                <div className="entry-name">
                    <Trans>Introduction</Trans>
                </div>
                <div className="entry-description">
                    <Trans>Click here for an introduction.</Trans>
                </div>
            </div>

            {Object.entries(member).map(([name, value]) => {
                if (name !== "name")
                    return (
                        <div className="entry">
                            <div className="entry-name">
                                <Trans>{name}</Trans>
                            </div>
                            <div className="entry-description">
                                {name === "email" ? (
                                    <a>
                                        <Trans>{value}</Trans>
                                    </a>
                                ) : (
                                    <Trans>{value}</Trans>
                                )}
                            </div>
                        </div>
                    );
                return <></>;
            })}
        </Page>
    );
}
