const io = require("socket.io-client");
//Connect to socket
const token = process.env.STREAMLABS_SOCKET_API_TOKEN; // token is contained within my system variables. you can just put your token here
const streamlabs = io(
	`https://sockets.streamlabs.com?token=` + token,
	{ transports: ["websocket"] }
);

console.log("Attempting start");

streamlabs.on("connect", () => {
	console.log("Connection To Server Successful...");
});

var baseUrl = "http://192.168.0.104/"; // ======= BASE URL =============
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

streamlabs.on("event", (eventData) => {
	console.log(eventData);
	if (eventData.for === "twitch_account" && (['follow', 'bits', 'host', 'donation', 'raid'].includes(eventData.type))) {
		console.log("New follower:");
		var followobj = eventData.message;
		var followname = followobj[0].name;
		var xhr = new XMLHttpRequest();
		var url = baseUrl + "follow";
		console.log(followname);
		xhr.open("GET", url);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log(xhr.status);
				console.log(xhr.responseText);
			}
		};
		xhr.send();
	}
    if (eventData.for === "twitch_account" && eventData.type == "subscription") {
		// console.log("New subscriber!");
		var xhr = new XMLHttpRequest();
		var url = baseUrl + "subscribe";
		xhr.open("GET", url);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log(xhr.status);
				console.log(xhr.responseText);
			}
		};
		xhr.send();
	}
});
