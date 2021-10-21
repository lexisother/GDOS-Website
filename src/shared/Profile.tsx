import React from "react";
import {differenceInYears} from "date-fns";
import {Trans} from "gatsby-plugin-react-i18next";
import {Member} from "../Members";

interface ProfileProps {
    children: React.ReactNode;
    memberProp: Member;
}

export default function Profile({children, memberProp}: ProfileProps): JSX.Element {
    const member = {
        name: memberProp.name!,
        dob: memberProp.dob!,
        role: memberProp.role!,
        education: memberProp.education!
    };
    return (
        <a style={{textDecoration: "none"}} href={`/members/${member.name.replace(/\s/g, "-")}`}>
            {/* TODO: Give clear indication of the card being clickable */}
            <div className="card">
                <div className="cardHeader">
                    {children}
                    <p className="name">{member.name}</p>
                </div>
                <div className="cardContent">
                    <p>
                        <Trans>Age</Trans>: {differenceInYears(new Date(), new Date(member.dob))}
                    </p>
                    <p>
                        <Trans>Role</Trans>: {member.role}
                    </p>
                </div>
            </div>
        </a>
    );
}
