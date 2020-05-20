const EventEmitter = require("events");
const Enum = require('enum');
const ColorEnum = new Enum(
	{
		'Green': 1, 
		'Yellow': 2, 
		'Red': 3
	}
); 

const StatusEnum = new Enum(
	{
		'Off': 0, 
		'On': 1, 
		'blink' : 2,
	}
); 
const DurtionEnum = new Enum(
	{
		Green: 15000, 
		Yellow: 5000, 
		Red: 20000, 
		GreenBlink: 3000, 
		RedYellow: 2500, 
	}
);
let eventName = "SetColor";
 
class TrafficLight extends EventEmitter {
 	constructor(color, duration) 
	{
		super();
        this.color = color;
        this.duration = duration;
		this.status = StatusEnum.Off.value;
    }

}
let green = new TrafficLight(ColorEnum.Green.value, DurtionEnum.Green);
let yellow = new TrafficLight(ColorEnum.Yellow.value, DurtionEnum.Yellow);
let red = new TrafficLight(ColorEnum.Red.value, DurtionEnum.Red);
green.on(eventName, function(status){
	green.status = status;
});
yellow.on(eventName, function(status){
	yellow.status = status;
});
red.on(eventName, function(status){
	red.status = status;
});
async function sleepPromise(time) {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}
async function waitGreen(duration) {
  console.log('waitGreen');
  await sleepPromise(duration) 
  green.emit(eventName, StatusEnum.blink);
  console.log('end waitGreen');
  getAllStatuses();
  waitGreenBlink(DurtionEnum.GreenBlink);
}
async function waitGreenBlink(duration) {
  console.log('waitGreenBlink');
  await sleepPromise(duration) 
  green.emit(eventName, StatusEnum.Off);
  yellow.emit(eventName, StatusEnum.On);
  console.log('end waitGreenBlink');
  getAllStatuses();
  waitYellow(yellow.duration);
}

async function waitGreenYellow(duration) {
  console.log('waitGreenYellow');
  await sleepPromise(duration) 
  green.emit(eventName, StatusEnum.Off);
  yellow.emit(eventName, StatusEnum.Off);
  red.emit(eventName, StatusEnum.On);
  console.log('end waitGreenYellow');
  getAllStatuses();
  waitRed(red.duration);
}
async function waitRedYellow(duration) {
  console.log('waitRedYellow');
  await sleepPromise(duration) 
  red.emit(eventName, StatusEnum.Off);
  yellow.emit(eventName, StatusEnum.Off);
  green.emit(eventName, StatusEnum.On);
  console.log('end waitRedYellow');
  getAllStatuses();
  waitGreen(DurtionEnum.RedYellow);
}

async function waitYellow(duration) {
  console.log('waitYellow');
  await sleepPromise(duration) 
  yellow.emit(eventName, StatusEnum.Off);
  red.emit(eventName, StatusEnum.On);
  console.log('end waitYellow');
  getAllStatuses();
  waitRed(red.duration);
}

async function waitRed(duration) {
  console.log('waitRed');
  await sleepPromise(duration) 
  yellow.emit(eventName, StatusEnum.On);
  console.log('end waitRed');
  getAllStatuses();
  waitRedYellow(yellow.duration);
}
function getAllStatuses()
{
	let htmlString = "getAllStatuses: " + ColorEnum.Green.toString() + ": status = " + green.status + "; ";
	htmlString += ColorEnum.Yellow.toString() + ": status = " + yellow.status + "; " ;
	htmlString += ColorEnum.Red.toString() + ": status = " + red.status + "; " ;
	console.log(htmlString);
}

module.exports.setColorTrafficLight = function(){
	red.emit(eventName, StatusEnum.On);
	yellow.emit(eventName, StatusEnum.Off);
	green.emit(eventName, StatusEnum.Off);
	getAllStatuses();
	waitRed(red.duration);
}
module.exports.TrafficLight = TrafficLight;
module.exports.green = green;
module.exports.yellow = yellow;
module.exports.red = red;


module.exports.ColorEnum = ColorEnum;
module.exports.StatusEnum = StatusEnum;
