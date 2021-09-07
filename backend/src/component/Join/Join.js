import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Join = () =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return(
        <div>
        <div>
        <input placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <input placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} />
      </div>
      <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
        <button  type="submit">Sign In</button>
      </Link>
      </div>

    )
}

export default Join;