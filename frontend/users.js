const users = [ ]


const addUser = ({name, room, id}) =>{
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) => user.name === name && user.room === room )
    if(!name || !room) return {error : 'name and room are required'}

    const user = { id, name, room };

    users.push(user)

    return { user }
}

const getUser = (clientData) => users.find( (user) => user.id === clientData)




// const getUsersInRoom = (room) => users.find( (user) => user.room === room)

module.exports = {addUser, getUser }


// const users = [];

// const addUser = ({ id, name, room }) => {
//   name = name.trim().toLowerCase();
//   room = room.trim().toLowerCase();

//   const existingUser = users.find((user) => user.room === room && user.name === name);

//   if(!name || !room) return { error: 'Username and room are required.' };
//   if(existingUser) return { error: 'Username is taken.' };

//   const user = { id, name, room };

//   users.push(user);

//   return { user };
// }

// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);

//   if(index !== -1) return users.splice(index, 1)[0];
// }

// const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// module.exports = { addUser, removeUser, getUser, getUsersInRoom };