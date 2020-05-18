const traffic = require("./traffic");
const EventEmitter = require("events");
const Enum = require('enum');

const time = 7200;

function GetTrafficStatus() {
	let arr = Array();
	let item = {color: traffic.green.color, status: traffic.green.status.value, blink: traffic.green.blink.value };
	arr.push(item);
	item = {color: traffic.yellow.color, status: traffic.yellow.status.value, blink: traffic.yellow.blink.value };
	 arr.push(item);
	item = {color: traffic.red.color, status: traffic.red.status.value, blink: traffic.red.blink.value };
	arr.push(item);	// arr.push(red);
	// console.log(arr);
	var myJsonString = JSON.stringify(arr);
	console.log(myJsonString);
}


traffic.setColorTrafficLight();
	setInterval(function() {
	GetTrafficStatus();	
}, time);



