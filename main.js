var people = {};
var http = require('http');
var fs = require('fs');
var io = require('socket.io')(http);  
var request = require('request');
var index;  
var characters = [];

var server = http.createServer(function(request, response) {
    if (request.url.indexOf('.js') != -1)
    {
        fs.readFile("./" + request.url, 'utf-8', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            response.write(data);
            response.end();
        });
    }
    else if (request.url.indexOf('.css') != -1)
    {
        fs.readFile("./" + request.url, 'utf-8', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(data);
            response.end();
        });
    }
    else
    {
        fs.readFile("index.html", 'utf-8', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        });
    }
}).listen(8080);

var socket = io.listen(server);

console.log("hello");
request('http://192.168.0.23:8000/character/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    characters = body  
    console.log(characters);
  }
})

socket.on("connection", function (client) {  
    
    client.on("join", function(name){
        people[client.id] = name;
        client.emit("get_all_characters", characters);
    });

    client.on("get_character_details", function(pk){
        request('http://192.168.0.23:8000/character_detail/get_details_by_character/?character='+pk, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            client.emit("got_character_details", body);
          }
        })
    });
    client.on("get_character_skills", function(pk){
        request('http://192.168.0.23:8000/skill_association/get_skill_association_by_character/?character='+pk, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            client.emit("got_character_skills", body);
          }
        })
    });
});
