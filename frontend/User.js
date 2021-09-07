const users = []

const addUser = ({id, name, room}) =>{
    name = name?.trim().toLowerCase();
    room = room?.trim().toLowerCase();

    const existingUser = users.find( (user) => user?.room === room && user.name === name);

    if(!name || !room) return {error: 'Username and room are required'}
    if(existingUser) return {error : 'Username is a token'}

    const user = {id, name, room}
    users.push(user)
    return {user}
}

const getUsersInRoom = (room) => users.filter( (user) =>{
    user?.room === room;
    console.log(user?.room === room, 'getUserInRoom')
})

const getUser = (id) => users.find((user) =>{
    user?.id === id;
    console.log(user?.id === id, "getUser")
})

module.exports = { addUser,getUsersInRoom, getUser };