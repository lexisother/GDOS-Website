import React from "react";
import {graphql} from "gatsby";
import {format as formatDate, formatDuration} from "date-fns";
import {FaCalendar, FaClock} from "react-icons/fa";
import Page from "./shared/Page";

export const query = graphql`
    query ($slug: String) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            frontmatter {
                title
                date
            }
            fields {
                slug
            }
            timeToRead
            excerpt(pruneLength: 280)
            html
        }
    }
`;

interface PostPageProps {
    data: {
        markdownRemark: GatsbyTypes.MarkdownRemark;
    };
}
export default function PostPage({data}: PostPageProps): JSX.Element {
    const post = {
        id: data.markdownRemark.fields?.slug!,
        title: data.markdownRemark.frontmatter?.title!,
        date: new Date(data.markdownRemark.frontmatter?.date!),
        timeToRead: data.markdownRemark.timeToRead!,
        excerpt: data.markdownRemark.excerpt!,
        html: data.markdownRemark.html!
    };

    return (
        <Page title={post.title} description={post.excerpt}>
            <div className="section-header">{post.title}</div>

            <div className="section-info">
                <div className="label">
                    <FaCalendar />
                    <div>{formatDate(post.date, "dd MMM yyyy")}</div>
                </div>
                <div className="label">
                    <FaClock />
                    <div>{formatDuration({minutes: post.timeToRead})} to read</div>
                </div>
            </div>

            <article dangerouslySetInnerHTML={{__html: post.html}} />
        </Page>
    );
}
