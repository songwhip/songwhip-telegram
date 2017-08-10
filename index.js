require('./env');

/**
 * External Dependencies
 */

const app = require('express')();

/**
 * Internal Dependencies
 */

require('./telegram');

/**
 * Locals
 */

const { PORT = 3001 } = process.env;

app.use('/facebook', require('./facebook'));
app.listen(PORT);
