import React from "react";
import {graphql} from "gatsby";
import {FaGithub} from "react-icons/fa";
import Page from "./shared/Page";

export const query = graphql`
    query {
        allLeasot(sort: {fields: [todo___modifiedTime], order: DESC}) {
            group(field: todo___tag) {
                fieldValue
                totalCount
                nodes {
                    id
                    todo {
                        tag
                        line
                        ref
                        value
                        modifiedTime(formatString: "YYYY-MM-DD H:mm")
                        file {
                            relativePath
                        }
                    }
                }
            }
        }
    }
`;

interface RoadmapPageProps {
    data: {allLeasot: GatsbyTypes.LeasotConnection};
}
export default function RoadmapPage({data}: RoadmapPageProps): JSX.Element {
    const roadmapDb = data.allLeasot.group.reduce(
        (result, each) => ({
            ...result,
            [each.fieldValue as string]: each
        }),
        {}
    );

    const sortArray = ["FIXME", "TODO", "NOTE", "DONE"];
    return (
        <Page>
            <h1>Website Roadmap</h1>
            {sortArray.map((label) => {
                /// @ts-expect-error This complains for God knows what reason. Will inspect later.
                const group: GatsbyTypes.LeasotGroupConnection = roadmapDb[label];
                if (!group) {
                    return null;
                }

                return (
                    <div className="roadmapList">
                        <div className="section-header">{label}</div>
                        {group.nodes.map((item) => (
                            <RoadmapItem t={item} key={item.id} />
                        ))}
                    </div>
                );
            })}
        </Page>
    );
}

function RoadmapItem({t}: {t: GatsbyTypes.Leasot}): JSX.Element {
    const githubLink = `https://github.com/lexisother/GDOS-Website/tree/master/${t.todo!.file!.relativePath}#L${
        t.todo!.line
    }`;
    return (
        <div className="entry">
            <div className="entry-name">{t.todo!.value!}</div>
            <div className="entry-info">
                <div className="label">
                    <FaGithub />
                    <a href={githubLink}>
                        {t.todo!.file!.relativePath}#L{t.todo!.line}
                    </a>
                </div>
            </div>
        </div>
    );
}
