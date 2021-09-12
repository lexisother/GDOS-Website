function resolvePlugin(plugin, options) {
    return {
        resolve: plugin,
        options: options
    };
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    flags: {PRESERVE_WEBPACK_CACHE: true},
    plugins: [
        resolvePlugin("gatsby-source-filesystem", {
            name: "data",
            path: `${__dirname}/src/data`
        }),
        resolvePlugin("gatsby-transformer-csv", {
            delimiter: ","
        }),
        resolvePlugin("gatsby-plugin-react-helmet"),
        resolvePlugin("gatsby-plugin-sass", {
            sassOptions: {
                includePaths: ["src/css"]
            }
        }),
        resolvePlugin("gatsby-plugin-image"),
        resolvePlugin("gatsby-plugin-sharp"),
        resolvePlugin("gatsby-plugin-typegen")
    ]
};
