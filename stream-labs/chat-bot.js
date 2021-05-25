const tmi = require("tmi.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Define configuration options
const opts = {
	identity: {
		username: "MarkIsNotCool",
		password: process.env.TWITCH_PASSWORD_CHAT_BOT,
	},
	channels: ["MarkIsNotCool"],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

const read = readTextFile("file://C:\\Users\\madiv\\Desktop\\GitHub\\Bailey-x-Twitch\\stream-labs\\whitelist.txt").split('\n');
var whitelist = [];
for (var i in read) {
	const name = read[i];
	if (name.length > 1) {
		whitelist.push(name.substring(0, name.length - 1));
	}
}
console.log(whitelist);

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
	if (self) {
		return;
	} // Ignore messages from the bot

	// Remove whitespace from chat message
	const commandName = msg.trim();
	const noHashTagName = target.substring(1, target.length);
	console.log(noHashTagName);

	// If the command is known, let's execute it
	if (commandName === "!dice") {
		const num = rollDice();
		client.say(target, `@${noHashTagName} You rolled a ${num} (1-6)`);
	} else if (commandName === "!ign") {
		client.say(target, `My MC ign is MarkIsCool`);
	} else if (commandName === "!specs") {
		const spces =
			"CPU: Ryzen 5 3600, 1050 Ti 4GB, 16GB RAM, Samsung 970 500GB SSD";
		client.say(target, specs);
	} else if (commandName === "!debug") {
	} else if (commandName === "!water") {
		if(whitelist.includes(noHashTagName)) {
			const baseUrl = "http://192.168.0.104/"
			var xhr = new XMLHttpRequest();
			var url = baseUrl + "command";
			xhr.open("GET", url);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					console.log(xhr.status);
					console.log(xhr.responseText);
				}
			};
			xhr.send();
			client.say(target, `Thanks for watering Bailey!`)
		} else {
			client.say(target, `@${noHashTagName} You are not whitelisted. Claim the "Give me power" channel points reward for 1000 fruit berries to be whitelisted.`);
		}
	}
	console.log(`* Executed ${commandName} command`);
}

// Function called when the "dice" command is issued
function rollDice() {
	const sides = 6;
	return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
}

function readTextFile(file) {
	var rawFile = new XMLHttpRequest();
	var allText;
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				allText = rawFile.responseText;
			}
		}
	}
	rawFile.send(null);
	return allText;

}