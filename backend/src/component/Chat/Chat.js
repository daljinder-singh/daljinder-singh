import React, {useEffect, useState} from 'react';
import { io } from "socket.io-client";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import './Chat.css'
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
			  setMessages(messages => [ ...messages, message ]);
			});
			
			socket.on("roomData", ({ users }) => {
				console.log(users,'USER')
			  setUsers(users );
			});
		}, []);
		console.log(message, "MESSAGE")
		console.log(messages, "MESSAGES")
		const sendMessage = (event) => {
			event.preventDefault();
		
			if(message) {
			  socket.emit('sendMessage', message, () => setMessage(''));
			}
		  }

	return (
		<>
		<div className="outerContainer">
		<div className="container">
			<div className = "room_name">{ room }</div> 
		<div className = "messages_section">
		{
			messages && messages.map( (item, key) =>{
				console.log(item, "item")
				return (<div key = {key}> {item?.user === name ? <span className= "userTextarea">{item?.message}</span> : 
					<span className = "roomTextarea">{item?.message}</span>
				}
				 </div>)
			})
		}

		</div>
		
		<form className="form">
				<input
				className="input"
				type="text"
				placeholder="Type a message..."
				value={message}
				onChange={({ target: { value } }) => setMessage(value)}
				onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
				/>
				<button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
			</form>
			</div>
			</div>
		</>
	)
}



export default Chat;
