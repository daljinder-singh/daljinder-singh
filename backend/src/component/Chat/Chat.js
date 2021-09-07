import React, {useEffect, useState} from 'react';
import { io } from "socket.io-client";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
const ENDPOINT = 'http://localhost:5000/'
let socket;

const Chat = () => {
	
	const location = useLocation();
	
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(()=>{
		
		const { name, room } = queryString.parse(location.search);
		socket = io(ENDPOINT);

		setRoom(room);
		setName(name)
	
		socket.emit('join', { name, room }, (error) => {
			if(error) {
			  alert(error);
			}
		  });
		}, [ENDPOINT, location.search]);

		useEffect(() => {
			socket.on('message', message => {
				console.log(message)
			  setMessages(messages => [ ...messages, message ]);
			});
			
			socket.on("roomData", ({ users }) => {
			  setUsers(users);
			});
		}, [message]);
		const sendMessage = (event) => {
			event.preventDefault();
		
			if(message) {
			  socket.emit('sendMessage', message, () => setMessage(''));
			}
		  }

	return (
		<>
		<div>
		{
			messages && messages.map( (item, key) =>{
				return <div key = {key}>{item.text}</div>
			})
		}

		</div>
		
			<form>
				<input
				type="text"
				placeholder="Type a message..."
				value={message}
				onChange={({ target: { value } }) => setMessage(value)}
				onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
				/>
				<button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
			</form>
		</>
	)
}



export default Chat;
