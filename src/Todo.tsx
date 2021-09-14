// FIXME: Rename Todo.tsx and its components to Roadmap

import React from "react";
import {graphql} from "gatsby";
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

// TODO: Clean the fuck up
interface TodoPageProps {
    data: {allLeasot: GatsbyTypes.LeasotConnection};
}
export default function TodoPage({data}: TodoPageProps): JSX.Element {
    const todoDb = data.allLeasot.group.reduce(
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
                const group: GatsbyTypes.LeasotGroupConnection = todoDb[label];
                if (!group) {
                    return null;
                }

                return (
                    <div className="todoList">
                        <div className="section-header">{label}</div>
                        {group.nodes.map((todo) => (
                            <TodoItem t={todo} key={todo.id} />
                        ))}
                    </div>
                );
            })}
        </Page>
    );
}

// TODO: Style this component
function TodoItem({t}: {t: GatsbyTypes.Leasot}): JSX.Element {
    const githubLink = `https://github.com/lexisother/GDOS-Website/tree/master/${t.todo!.file!.relativePath}#L${
        t.todo!.line
    }`;
    return (
        <div className="entry">
            <div className="entry-name">{t.todo!.value!}</div>
            <div className="entry-info">
                <div className="label">
                    <a href={githubLink}>
                        {t.todo!.file!.relativePath}#L{t.todo!.line}
                    </a>
                </div>
            </div>
        </div>
    );
}
