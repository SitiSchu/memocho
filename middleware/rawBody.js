const {maxPasteBytes} = require('../config');

module.exports = () => (req, res, next) => {
    // Nothing left to read: no body, or already consumed by express.urlencoded/json
    if (req.readableEnded) return next();

    const chunks = [];
    let size = 0;

    req.on('data', chunk => {
        size += chunk.length;
        if (size > maxPasteBytes) {
            res.status(413).type('text/plain').send('Payload too large');
            // Drop the rest of the upload instead of buffering it
            return req.destroy();
        }
        chunks.push(chunk);
    });
    req.on('end', () => {
        req.rawText = Buffer.concat(chunks).toString('utf8');
        next();
    });
    req.on('error', () => {}); // client aborted mid-upload
};
