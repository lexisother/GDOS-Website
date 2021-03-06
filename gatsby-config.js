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
    siteMetadata: {
        blogEnabled: true
    },
    flags: {FAST_DEV: true, PARALLEL_SOURCING: true, LMDB_STORE: true, DEV_SSR: false},
    plugins: [
        resolvePlugin("gatsby-source-filesystem", {
            name: "data",
            path: `./data`
        }),
        resolvePlugin("gatsby-source-filesystem", {
            name: "images",
            path: `./src/images`
        }),
        resolvePlugin("gatsby-transformer-excel"),
        resolvePlugin("gatsby-transformer-remark", {
            plugins: [
                // Transform image links
                resolvePlugin("gatsby-remark-images", {
                    maxWidth: 1280,
                    linkImagesToOriginal: false
                }),

                // Syntax highlighting
                resolvePlugin("gatsby-remark-prismjs", {
                    classPrefix: "language-",
                    noInlineHighlight: true
                }),

                // Markdown extensions
                resolvePlugin("gatsby-remark-smartypants")
            ]
        }),
        resolvePlugin("gatsby-source-filesystem", {
            path: `${__dirname}/data/locales`,
            name: `locale`
        }),
        resolvePlugin("gatsby-plugin-react-i18next", {
            localeJsonSourceName: `locale`,
            languages: [`en`, `nl`],
            defaultLanguage: `en`,
            i18nextOptions: {
                interpolation: {
                    escapeValue: false
                },
                keySeparator: false,
                nsSeparator: false
            }
        }),
        resolvePlugin("gatsby-source-filesystem", {
            path: __dirname,
            name: `leasot`,
            ignore: [
                /\.*.*\/(node_modules|\.cache|public|__generated__|static|dist|\.yarn)\/./,
                /\.*.\.(log|jpe?g|png|gif|ico|json|map|gz|pdf)/
            ]
        }),
        resolvePlugin("gatsby-transformer-leasot", {
            sourceInstanceName: "leasot",
            customTags: ["NOTE"],
            mode: "text"
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
