import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import Messages from '../Messages/Messages';
import MessageBox from '../MessageBox/MessageBox';
import { useSelector } from 'react-redux';
import './Chat.css'
const ENDPOINT = 'http://localhost:4042/'
let socket;

const Chat = () => {
	const selector = useSelector((state) => state.message)

	const [Name, setName] = useState('');
	const [Room, setRoom] = useState('');
	const [messages, setMessages] = useState([]);

	const location = useLocation();

	useEffect(() => {
		const { name, room } = queryString.parse(location.search)
		socket = io(ENDPOINT)
		setRoom(room)
		setName(name)
		socket.emit('newUser', { name, room }, error => {
			if (error) {
				alert(error)
			}
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ENDPOINT, location.search]);

	 	useEffect(() => {
			socket.on('message', message => {
			     if(typeof message !== 'undefined')setMessages(messages => [ ...messages, message ]);
			});
			
	// 		socket.on("roomData", ({ users }) => {
	// 			console.log(users,'USER')
	// 		  setUsers(users );
	// 		});
	 	}, []);
		 useEffect( () =>{
			socket.emit('sendMessage', selector);
		 },[selector])

	return (
		<>
			<div className="outerContainer">
				<div className="container">
					<div className="room_name">{Room}</div>
					<Messages messages={messages} name = {Name} />
					<MessageBox />
				</div>
			</div>
		</>
	)
}



export default Chat;
