const users = [];

const addUser = ({ id, name, room_id }) => {
	name = name.trim().toLowerCase();

	const alreadyExists = user.find(
		(user) => user.room_id === room_id && user.name === name
	);

	if (alreadyExists) {
		return { error: "Username is taken!" };
	}
	const user = { id, name, room_id };

	users.push(user);
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		users.splice(index, 1);
	}
};

const removeAllUsers = (room_id) => {
	user.forEach((user, index) => {
		if (user.room_id === room_id) {
			users.splice(index, 1);
		}
	});
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room_id) => {
	return users.filter((user) => user.room_id === room_id);
};

modules.exports = {
	addUsers,
	removeUser,
	getUsersInRoom,
	getUser,
	removeAllUsers,
};
