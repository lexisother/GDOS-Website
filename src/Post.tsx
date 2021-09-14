import React from "react";
import {graphql} from "gatsby";
import Page from "./shared/Page";

export const query = graphql`
    query ($slug: String) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            frontmatter {
                title
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
        timeToRead: data.markdownRemark.timeToRead!,
        excerpt: data.markdownRemark.excerpt!,
        html: data.markdownRemark.html!
    };

    return (
        <Page title={post.title} description={post.excerpt}>
            <h1>{post.title}</h1>
        </Page>
    );
}
