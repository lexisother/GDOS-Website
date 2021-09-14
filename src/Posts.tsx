import React from "react";
import {graphql} from "gatsby";
import Page from "./shared/Page";

export const query = graphql`
    query {
        allMarkdownRemark {
            nodes {
                frontmatter {
                    title
                    date
                }
                fields {
                    slug
                }
                timeToRead
            }
        }
    }
`;

interface PostsPageProps {
    data: {allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection};
}
export default function PostsPage({data}: PostsPageProps): JSX.Element {
    const posts = [...data.allMarkdownRemark.nodes].map((node) => ({
        id: node.fields?.slug!,
        title: node.frontmatter?.title,
        date: new Date(node.frontmatter?.date!),
        timeToRead: node.timeToRead!
    }));

    const years = [...new Set(posts.map((post) => post.date.getFullYear()))];

    const postsByYear = years
        .sort((a, b) => b - a)
        .map((year) => ({year, posts: posts.filter((post) => post.date.getFullYear() === year)}));

    return (
        <Page>
            <h1>Posts</h1>
            {postsByYear.map(({year, posts}) => (
                <div>
                    {year !== 1970 && <h2>{year}</h2>}
                    {posts.map((post) => (
                        <h3>
                            <a href={`/blog/${post.id}`}>{post.title}</a>
                        </h3>
                    ))}
                </div>
            ))}
        </Page>
    );
}
