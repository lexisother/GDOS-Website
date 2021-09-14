// @ts-check
const path = require("path");

/**
 * @type {import('gatsby').GatsbyNode}
 */
module.exports = {
    onCreateNode: ({actions, node}) => {
        if (node.internal.type === "MarkdownRemark") {
            // Add slug to markdown files
            // @ts-expect-error: node.fileAbsolutePath is unknown
            const value = path.basename(path.dirname(node.fileAbsolutePath));
            actions.createNodeField({
                node,
                name: "slug",
                value
            });
        }
    },
    createPages: async ({actions, graphql}) => {
        actions.createPage({
            path: "/",
            component: path.resolve("./src/Home.tsx"),
            context: null
        });
        actions.createPage({
            path: "/members",
            component: path.resolve("./src/Members.tsx"),
            context: null
        });
        actions.createPage({
            path: "/roadmap",
            component: path.resolve("./src/Roadmap.tsx"),
            context: null
        });
        actions.createPage({
            path: "/blog",
            component: path.resolve("./src/Posts.tsx"),
            context: null
        });

        // Generate pages for blog posts
        const queryResult = await graphql(`
            query {
                allMarkdownRemark {
                    nodes {
                        fields {
                            slug
                        }
                    }
                }
            }
        `);

        if (queryResult.errors) throw queryResult.errors;

        /**
         * @type {GatsbyTypes.MarkdownRemarkConnection}
         */
        const blogPostConnection = queryResult.data.allMarkdownRemark;

        blogPostConnection.nodes.forEach((node) => {
            if (!node.fields) {
                return;
            }

            const {slug} = node.fields;
            // const coverImagePath = `blog/${slug}/Cover.png`;

            actions.createPage({
                path: `/blog/${slug}`,
                component: path.resolve("./src/Post.tsx"),
                // context: {slug, coverImagePath}
                context: {slug}
            });
        });
    }
};
