import React, { useState, useCallback } from 'react'
import {useDispatch} from 'react-redux'

const MessageBox = () =>{
    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    const autoFocus = useCallback(el => el ? el.focus() : null, [])

    const inputHandle  = e =>{
        setValue(e.target.value)
    }
    const sendMessage = e =>{
             e.preventDefault()
             if(value !== '') dispatch({type : 'FORM_VALUE', payload : value})
             setValue('')
    }

    return (
        <form className="form">
            <input
				className="input"
				type="text"
				placeholder="Type a message..."
                value = {value}
                onChange = {inputHandle}
                ref={autoFocus}
                onKeyPress = {event => event.key === 'Enter' ? sendMessage : null}
                />
				<button className="sendButton" onClick = {sendMessage}>Send</button>
        </form>

    )
}
export default MessageBox