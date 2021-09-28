import React from "react";
import Page from "./shared/Page";

interface MemberPageProps {
    pageContext: {
        member: GatsbyTypes.MembersXlsx__Sheet1;
    };
}
export default function MemberPage({pageContext}: MemberPageProps): JSX.Element {
    const member = {
        name: pageContext.member.Name,
        age: pageContext.member.Age,
        role: pageContext.member.Role,
        education: pageContext.member.Education
    };
    return (
        <Page title={member.name}>
            <div className="section-header">{member.name}</div>
        </Page>
    );
}
