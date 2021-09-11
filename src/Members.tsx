import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import Page from "./shared/Page";
import Profile from "./shared/Profile";

export default function MemberPage(): JSX.Element {
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
                <Profile name="test">
                    <StaticImage src="./images/logo.png" alt="logo" height={100} />
                </Profile>
                <Profile name="test">
                    <StaticImage src="./images/logo.png" alt="logo" height={100} />
                </Profile>
                <Profile name="test">
                    <StaticImage src="./images/logo.png" alt="logo" height={100} />
                </Profile>
                <Profile name="test">
                    <StaticImage src="./images/logo.png" alt="logo" height={100} />
                </Profile>
                <Profile name="test">
                    <StaticImage src="./images/logo.png" alt="logo" height={100} />
                </Profile>
                <Profile name="test">
                    <StaticImage src="./images/logo.png" alt="logo" height={100} />
                </Profile>
            </div>
        </Page>
    );
}