var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
var cookieparser=require('cookie-parser');
app.use(cookieparser());
var msg;
var snd;
io.on('connection',function(socket){
    var address=socket.handshake.address;
    console.log('New connection from '+ address);
    socket.on('msg', function(msg1){
        console.log(msg1.sender, " : " , msg1.actual);
        msg=msg1.actual;
        snd=msg1.sender;
        socket.broadcast.emit('msg_callback',{actual1: msg, sender1: snd});
    });
});
server.listen(5000);