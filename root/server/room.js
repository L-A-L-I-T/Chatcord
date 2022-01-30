const rooms = [];

const addRoom = (room_id) => {
	const alreadyExists = rooms.find((room) => {
		user.room_id === room.id;
	});
	if (alreadyExists) {
		return { error: "Room alreadyExists" };
	}
	rooms.push(room_id);
};

const creatRoomId = () => {
	var room_id = "";
	var characters =
		"abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (var i, i = 0; i < 6; i++) {
		room_id += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return room_id;
};

const deleteRoom = (room_id) => {};
