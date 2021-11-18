import {useStaticQuery, graphql} from "gatsby";

interface SiteMetadata {
    blogEnabled: boolean;
}

export default function useSiteMetadata(): SiteMetadata {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    blogEnabled
                }
            }
        }
    `);

    return data.site.siteMetadata as SiteMetadata;
}
