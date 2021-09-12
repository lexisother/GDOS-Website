import React from "react";
import {graphql} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";
import Page from "./shared/Page";
import Profile from "./shared/Profile";

export const query = graphql`
    query {
        allMembersCsv {
            nodes {
                Name
                Age
            }
        }
    }
`;

interface MemberPageProps {
    data: {allMembersCsv: GatsbyTypes.MembersCsvConnection};
}
export default function MemberPage({data}: MemberPageProps): JSX.Element {
    const members = [...data.allMembersCsv.nodes].map((node) => ({
        name: node.Name!,
        age: node.Age!
    }));

    return (
        <Page>
            <h1>Members</h1>
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
            <div className="cards">
                {members[0]
                    ? members.map((member) => (
                          <Profile name={member.name} description={`Age: ${member.age}`}>
                              <StaticImage src="./images/logo.png" alt="logo" height={100} />
                          </Profile>
                      ))
                    : "Nobody here but us chickens."}
            </div>
        </Page>
    );
}
