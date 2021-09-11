import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

const md = new MarkdownIt({
    html: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {language: lang}).value;
            } catch (_) {}
        }
        return "";
    }
});

interface MDProps {
    text: string;
}

/** The issue with this component right now is that, if you want to do proper
 * Markdown with it without everything breaking, you need to pass a template
 * literal. So, for example, if you want two headings, you would do
 * text={`#Test\n## Test`}
 * Is it ugly? Yes. Will I improve it? Yes. Do I know how? Absolutely not.
 *
 * Will I end up writing my own Markdown renderer speifically for this project?
 * Probably.
 */
export default function Markdown({text}: MDProps): JSX.Element {
    return <div dangerouslySetInnerHTML={{__html: md.render(text)}}></div>;
}
