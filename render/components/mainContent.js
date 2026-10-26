const highlight = require('./highlight');

module.exports = (m, {location, content, language}) => {
    // Treat the hint as data: keep only class-name characters so it can never
    // become selector syntax (e.g. an injected [attr=value] block).
    const languageClass = ("" + (language || "")).replace(/[^a-zA-Z0-9_+-]/g, "");
    language = language && [language];
    const isSnippet = location === 'snippet';
    const textArea =
        (isSnippet ? "code" : "textarea.binEditor")
        + "#snippet.textarea"
        + (languageClass ? "." + languageClass : "");
    const highlighted =
        isSnippet && (highlight(m, {content, language}));

    return m(
        "form#codeSnippet.container", {name: "codeSnippet",},
        [
            m(
                "#main.content",
                m(
                    textArea,
                    {
                        name: "snippet",
                        spellcheck: "false",
                        "data-gramm": "false",
                        ...(!isSnippet && {autofocus: "true"}),
                        ...(isSnippet && {readOnly: "true"}),
                    },
                    highlighted || content
                )
            ),
            (isSnippet &&
                m(
                    'textarea#originalSnippet',
                    {
                        style: "display: none",
                        readOnly: "true",
                        name: "snippet",
                        spellcheck: "false",
                        "data-gramm": "false",
                    },
                    content
                )
            ),
        ]
    );
};
