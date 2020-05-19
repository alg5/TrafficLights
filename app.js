const Enum = require('enum');
const traffic = require("./traffic");
const http = require("http");
const fs = require("fs");
const querystring = require('querystring');
const url = require('url');
const express = require("express");
  
const app = express();
var cors = require('cors')

app.use(cors());
app.use('/', function(request, response, next){
     
//    console.log("Middleware 1");
	request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
app.get("/", function(request, response){
	let myJsonString = GetTrafficStatus();
    response.send(myJsonString);
});

app.listen(3000, "127.0.0.1",function(){
    console.log("Server begin to listen port 3000");
	traffic.setColorTrafficLight();
});
function GetTrafficStatus() {
	let arr = Array();
	let item = {color: traffic.green.color, status: traffic.green.status.value, blink: traffic.green.blink.value };
	arr.push(item);
	item = {color: traffic.yellow.color, status: traffic.yellow.status.value, blink: traffic.yellow.blink.value };
	 arr.push(item);
	item = {color: traffic.red.color, status: traffic.red.status.value, blink: traffic.red.blink.value };
	arr.push(item);
	var myJsonString = JSON.stringify(arr);
	return myJsonString;
}


