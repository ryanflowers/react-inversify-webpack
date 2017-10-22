(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

var express = require('express');
var server = express();
server.use('/', express.static(__dirname + '/'));
server.listen(8080);
console.info('Listening on port ' + 8080);