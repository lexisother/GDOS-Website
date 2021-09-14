import React from "react";
import {graphql} from "gatsby";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {StaticImage} from "gatsby-plugin-image";
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

// FIXME: For the love of God, move this to a separate page. This is a horrendous implementation.
interface HomePageProps {
    data: {allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection};
}
export default function HomePage({data}: HomePageProps): JSX.Element {
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

    // TODO: Write a short pitch
    const markdown = `Dit is de home-pagina van Gilde DevOps Solutions.

Algemene TODO:
* [x] Markdown rendering (evt blog-posts)
* [x] CSV parsing voor [members](/members)
* [ ] Windows tutorial?
* [ ] MySQL database voor [members](/members)
`;

    return (
        <Page>
            <h1>Home</h1>
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
            <Markdown children={markdown} plugins={[remarkGfm as any]} />
            <hr />
            {postsByYear.map(({year, posts}) => (
                <div>
                    <h2>{year}</h2>
                    <hr />
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
