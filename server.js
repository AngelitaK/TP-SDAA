// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get our API routes
const api = require('./server/routes/api');
const app = express();
// Parsers for POST data
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set our API routes
app.use('/api', api);
// Catch all other routes and return the index file
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'dist/index.html'));});
// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);
// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));