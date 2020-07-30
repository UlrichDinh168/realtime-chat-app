const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();//trim remove white spaces
  room = room.trim().toLowerCase();

  //find user with existing name n room
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room }; // = {id:id, name:name, room:room} -- create new user

  users.push(user);//push to user array

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };