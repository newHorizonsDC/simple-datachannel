var WebSocket = require("ws");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8088});

var wsList = {};

wss.on('connection', function(ws){
    wsList[ws.upgradeReq.url.slice(1)] = ws;
    console.log('WS connection established!')

    ws.on('close', function(){ wsList.splice(wsList.indexOf(ws),1);
        console.log('WS closed!');
    });

    ws.on('message', function(message){
        console.log('Got ws message: '+message);
        var Message = JSON.parse(message)
        wsList[Message['to']].send(message);
    });
});

var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/static'));
app.listen(8888);
console.log("Serving on port 8888");
