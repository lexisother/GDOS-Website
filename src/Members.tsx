import React from "react";
import {graphql} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";
import Page from "./shared/Page";
import Profile from "./shared/Profile";

export const query = graphql`
    query {
        allMembersXlsxSheet1 {
            nodes {
                Name
                Age
            }
        }
    }
`;

interface MemberPageProps {
    data: {allMembersXlsxSheet1: GatsbyTypes.MembersXlsx__Sheet1Connection};
}
export default function MemberPage({data}: MemberPageProps): JSX.Element {
    const members = [...data.allMembersXlsxSheet1.nodes].map((node) => ({
        name: node.Name!,
        age: node.Age!
    }));

    return (
        <Page>
            <h1>Members</h1>
            <hr />
            <div className="cards">
                {/* FIXME: I am not aware of a better way to do this. plsfix. */}
                {members[0]
                    ? members.map((member) => (
                          <Profile name={member.name} description={`Age: ${member.age}`}>
                              {member.name === "Keanu Timmermans" && (
                                  <StaticImage src="./images/keanu.jpg" alt={member.name} height={130} />
                              )}
                              {member.name === "Njord-Romijn Witsiers" && (
                                  <StaticImage src="./images/njord-romijn.jpg" alt={member.name} height={130} />
                              )}
                              {member.name === "Lars Leijssen" && (
                                  <StaticImage src="./images/lars.jpg" alt={member.name} height={130} />
                              )}
                              {member.name === "Dion Welles" && (
                                  <StaticImage src="./images/dion.jpg" alt={member.name} height={130} />
                              )}
                              {member.name === "Tom Vergeldt" && (
                                  <StaticImage src="./images/tom.jpg" alt={member.name} height={130} />
                              )}{" "}
                          </Profile>
                      ))
                    : "Nobody here but us chickens."}
            </div>
        </Page>
    );
}
