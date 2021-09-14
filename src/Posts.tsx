import React from "react";
import {graphql} from "gatsby";
import Page from "./shared/Page";
import {format as formatDate, formatDuration} from "date-fns";
import {FaCalendar, FaClock} from "react-icons/fa";

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
                <div key={year} className="group">
                    {year !== 1970 && (
                        <>
                            <div className="group-header">
                                <div>{year}</div>
                                <hr className="group-header-line" />
                            </div>
                            {posts.map((post) => (
                                <div key={post.id} className="entry">
                                    <div className="entry-name">
                                        <a href={`/blog/${post.id}`}>{post.title}</a>
                                    </div>

                                    <div className="entry-info">
                                        <div className="label">
                                            <FaCalendar />
                                            <div>{formatDate(post.date, "dd MMM yyyy")}</div>
                                        </div>
                                        <div className="label">
                                            <FaClock />
                                            <div>{formatDuration({minutes: post.timeToRead})} to read</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ))}
        </Page>
    );
}
