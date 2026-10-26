module.exports = (m, {isSnippet}) => {
    return m("footer", [
        m("div.footer-keybindings",
            m(
                "a#newButton.submit",
                {href: "/"},
                [
                    "New Snippet", m("span.keyboard-shortcut", [": Ctrl + Alt + A"])
                ],
            ),
            "  ",
            m(
                "button#actionButton.submit",
                {
                    type: "submit",
                    formaction: isSnippet ? "fork" : "/",
                    formenctype: "application/x-www-form-urlencoded",
                    formmethod: "post",
                    form: "codeSnippet",
                },
                isSnippet
                    ? ["Fork", m("span.keyboard-shortcut", [": Ctrl + Alt + F"])]
                    : ["Save", m("span.keyboard-shortcut", [": Ctrl + S"])],
            ),
            " ",
        ),
        m("a#name-label", {
            href: "https://git.yaji.dev/sitischu/memocho",
            target: "blank",
            rel: "noopener"
        }, " Memochō"),

        m("code.footer-text", [
            " Built by",
            m(
                "a",
                {
                    href: "https://github.com/MKRhere",
                    target: "blank",
                    rel: "noopener"
                },
                "@MKRhere"
            ),
            ", Modified by",
            m(
                "a",
                {
                    href: "https://git.yaji.dev/sitischu/",
                    target: "blank",
                    rel: "noopener"
                },
                "@SitiSchu"
            ),
        ]),
    ]);
};
