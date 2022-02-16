const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const PORT = Process.env.PORT || 8000;

const { addUser, removeUser, getUsersInRoom, getUser } = require("./users.js");

const app = express();

const router = require("./router");

app.use(cors());
app.use(router);
const server = http.createServer(app);
const io = socketio(server);

io.on("connect", (socket) => {
	console.log("New Connection");

	socket.on("join", ({ name, room }, callback) => {
		const { error, user } = addUser({
			id: socket.id,
			name,
			room,
		});

		if (error) return callback(error);
		socket.join(user.room);
		socket.emit("message", {
			user: "Bot",
			text: `${user.name} , Welcome to the room ${user.room}`,
		});

		socket.broadcast
			.to(user.room)
			.emit("message", { user: "Bot", text: `${user.name}, has joined!` });

		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getUsersInRoom(user.room),
		});

		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit("message", { user: user.name, text: message });
		console.log(message);
		callback();
	});
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit("message", {
				user: "Bot",
				text: `${user.name} has left the room.`,
			});
			io.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server has started at Port : ${PORT}`);
});
