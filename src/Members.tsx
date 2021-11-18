import React, {useState} from "react";
import {graphql} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";
import ModalVideo from "react-modal-video";
import Page from "./shared/Page";
import Profile from "./shared/Profile";

export const query = graphql`
    query ($language: String!) {
        allMembersXlsxSheet1 {
            nodes {
                Name
                DoB
                Role
                Education
            }
        }
        locales: allLocale(filter: {ns: {in: ["main", "members"]}, language: {eq: $language}}) {
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

interface MembersPageProps {
    data: {allMembersXlsxSheet1: GatsbyTypes.MembersXlsx__Sheet1Connection};
}
export interface Member {
    name: string;
    dob: string;
    role: string;
    education: string;
}
export default function MembersPage({data}: MembersPageProps): JSX.Element {
    const members = [...data.allMembersXlsxSheet1.nodes].map((node) => ({
        name: node.Name!,
        dob: node.DoB!,
        role: node.Role!,
        education: node.Education!
    }));

    const categories = {} as Record<string, Member[]>;
    members.forEach((member) => {
        categories[member.education] ||= [];
        categories[member.education].push(member);
    });

    return (
        <Page>
            <h1>Members</h1>
            <hr />
            {Object.entries(categories).map(([category, members]) => (
                <>
                    <div className="section-header">{category}</div>
                    <div className="cards">
                        {/* FIXME: I am not aware of a better way to do the images. plsfix. */}
                        {members[0]
                            ? members.map((member, i) => (
                                  <Profile memberProp={member} key={i}>
                                      <img
                                          src={`/images/${member.name.toLowerCase().split(" ")[0]}.jpg`}
                                          alt={member.name}
                                          height={130}
                                      />
                                  </Profile>
                              ))
                            : "Nobody here but us chickens."}
                    </div>
                </>
            ))}
        </Page>
    );
}
