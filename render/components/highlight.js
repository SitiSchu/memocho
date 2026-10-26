const hl = require('highlight.js');
const {maxHighlightBytes} = require('../../config');

module.exports = (m, {content = '', language}) => {
    const text = (content || "") + "\n";
    const highlight = text.length <= maxHighlightBytes;
    const lines = (highlight
        ? hl.highlightAuto(text, language).value
        : text
    ).split('\n');

    return m('table',
        m('tbody',
            lines.map((line, index) => m('tr',{'id': `L${index + 1}`, 'class': 'code-row'}, [
                m('td.line-number',
                    {'data-line-number': index + 1}),
                highlight
                    ? m('td', m.trust(`<code class="loc">${line}</code>`))
                    : m('td', m('code.loc', line)),
            ]))
        ),
    );
};
