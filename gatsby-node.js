// @ts-check
const path = require("path");

/**
 * @type {import('gatsby').GatsbyNode}
 */
module.exports = {
    createPages: async ({actions}) => {
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
    }
};
