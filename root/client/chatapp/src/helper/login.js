import React from "react";
import io from "socket.io-client ";

export const joinRoom = ({ name, room_id }) => {
	localStorage.setItem("name", JSON.stringify({ username: name }));
};

export const createRoom = (name) => {};
