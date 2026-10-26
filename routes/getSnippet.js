const render = require('../render');
const hl = require('highlight.js');

module.exports = (req, res) => {

    const {models, mongoose} = req;
    const [id, rawLanguage] = (req.params.id || '').split('.');
    // Only accept a language highlight.js actually knows; this value is
    // interpolated into the render selector, so it must not carry
    // selector metacharacters such as [ ] = . # or whitespace.
    const language = rawLanguage && hl.getLanguage(rawLanguage) ? rawLanguage : undefined;
    const rawMode = Boolean(req.query.raw);
    return models.snippets.findOne({_id: mongoose.Types.ObjectId(id)})
        .then(doc => {
            if (!doc) {
                res.status(404);
                return res.send(
                    '<code>Nothing here, go <a href="/">back!</a></code>'
                );
            }
            if (rawMode) {
                res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                res.end(doc.content);
            } else
                return render(
                    req.mithril,
                    req.render,
                    {location: 'snippet', content: doc.content, language,}
                ).then(html => res.send(html));
        });

};
