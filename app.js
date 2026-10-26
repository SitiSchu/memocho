const express = require('express');
const helmet = require('helmet');

const {maxPasteBytes} = require('./config');
const rawBody = require('./middleware/rawBody');
const mongoose = require('./middleware/mongoose');
const render = require('./middleware/render');

const app = express();

const home = require('./routes/home');
const getSnippet = require('./routes/getSnippet');
const createSnippet = require('./routes/createSnippet');
const fork = require('./routes/fork');

app.use(helmet({
    contentSecurityPolicy: {
        // helmet-csp 2 predates script-src-attr; loose skips its directive allowlist
        loose: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            // Inline event handlers stay disabled even if a template slips
            scriptSrcAttr: ["'none'"],
            // The original-snippet textarea uses a style attribute
            styleSrc: ["'self'", "'unsafe-inline'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            frameAncestors: ["'self'"],
            formAction: ["'self'"],
        },
    },
}));
app.use(express.static(__dirname + '/public'));
app.use('/custom', express.static(__dirname + '/custom'));
app.use(express.urlencoded({extended: true, limit: maxPasteBytes})); // parse formdata
app.use(express.json({limit: maxPasteBytes})); // parse JSON requests
app.use(rawBody());

app.use(mongoose());
app.use(render());

app.post('/fork', fork);
app.post('/', createSnippet);

app.get('/~:id', getSnippet);
app.get('/', home);


const PORT = process.env.BIN_PORT || 1998;
const HOST = process.env.BIN_HOST || '127.0.0.1'
app.listen(PORT, HOST, () => console.log('Listening on port', PORT));
