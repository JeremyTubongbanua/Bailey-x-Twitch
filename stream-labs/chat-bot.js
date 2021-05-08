const tmi = require("tmi.js");
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

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
	if (self) {
		return;
	} // Ignore messages from the bot

	// Remove whitespace from chat message
	const commandName = msg.trim();

	// If the command is known, let's execute it
	if (commandName === "!dice") {
		const num = rollDice();
		client.say(target, `You rolled a ${num} (1-6)`);
	} else if (commandName === "!ign") {
		client.say(target, `My MC ign is MarkIsCool`);
	} else if (commandName === "!specs") {
		const spces =
			"CPU: Ryzen 5 3600, 1050 Ti 4GB, 16GB RAM, Samsung 970 500GB SSD";
		client.say(target, specs);
	} else if (commandName === "!debug") {
		console.log(msg);
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
