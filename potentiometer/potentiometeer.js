var five = require('johnny-five');
var http = require('http');
var express = require('express'),
    app = module.exports.app = express(),
    io = require('socket.io'),
     potentiometer;
var board = new five.Board();
app.use(express.static('public'));
board.on('ready', function(){
  potentiometer = new five.Sensor({
    pin: 'A2',
    freq: 250
  });
var led = new five.Led(11);
  board.repl.inject({
    pot: potentiometer
  });
  potentiometer.on('data', function(){
    var list = this.value;
    console.log(list);
    led.brightness(list);
    io.emit('value', {
        data: list
    });
  });
});
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.port || 8060;
server.listen(port);
console.log('App running on port ', port);
