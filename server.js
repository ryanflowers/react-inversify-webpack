var express = require('express');
var server = express();
server.use('/', express.static(__dirname + '/'));
server.listen(8080);
console.info('Listening on port ' + 8080);