const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const { addUser, removeUser, getUsersInRoom, getUser } = require("./users.js");

const app = express();

const router = require("./router");

app.use(cors());
app.use(router);
app.get("/", (req, res) => res.send("Hello World"));
const server = http.createServer(app);
const io = socketio(server);
io.on("connect", (socket) => {
	console.log("New Connection");
	var time = moment().format("LT");
	socket.on("join", ({ name, room }, callback) => {
		console.log(time);
		const { error, user } = addUser({
			id: socket.id,
			name,
			room,
		});

		if (error) return callback(error);
		socket.join(user.room);
		socket.emit("message", {
			user: "Bot",
			time: time,
			data: {
				type: "msg",
				msg: `${user.name} , Welcome to the room ${user.room}`,
			},
		});

		socket.broadcast.to(user.room).emit("message", {
			user: "Bot",
			time: time,
			data: { type: "msg", msg: `${user.name}, has joined!` },
		});

		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getUsersInRoom(user.room),
		});

		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);
		var time = moment().format("LT");
		io.to(user?.room).emit("message", {
			user: user.name,
			data: message,
			time: time,
		});
		callback();
	});
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		var time = moment().format("LT");
		if (user) {
			io.to(user.room).emit("message", {
				user: "Bot",
				data: {
					type: "msg",
					msg: `${user.name} has left the room.`,
				},
				time: time,
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
