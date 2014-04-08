
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , socketio = require('socket.io');

var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


io.configure('production', function(){
  io.enable('browser client etag');
  io.set('log level', 1);
});

io.configure('development', function(){
  io.set('log level', 1);
});

io.sockets.on('connection', function(socket) {
    socket.on('event', function(event) {
        socket.join(event);
    });
});

require('./routes')(app, io);