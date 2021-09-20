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