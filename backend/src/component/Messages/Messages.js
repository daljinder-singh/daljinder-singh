import React, {useEffect} from 'react'

let speed = 2; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 5;


const Messages = ({ messages, name }) => {
    useEffect( () =>{
        startScroll()
    },[messages])

// function startScroll(){
//     let id = setInterval(function() {
//         DOM.scrollBy(0, 2);
//         if ((DOM.innerHeight + DOM.scrollY) >= document.body.offsetHeight) {
//             // Reached end of page
//             stopScroll();
//         }
//     }, interval);
//     return id;

// }

const startScroll = () =>{
    const DOM = document.querySelector('.messages_section')
    let id = setInterval( ()=>{
        const scrollHight = DOM.scrollHeight - Math.abs(DOM.scrollTop)
        DOM.scrollBy(0, 20)
        if((DOM.clientHeight ) === scrollHight){
            clearInterval(id);
        }
        
    }, interval);
    // return id
}

// function stopScroll() {
//     clearInterval(startScroll());
    
//     console.log('stop')
// }

// document.body.addEventListener('keypress', function (event)
// {
//     if (event.which == 13 || event.keyCode == 13) {
//         // It's the 'Enter' key
//         if(paused == true) {
//             scrollerID = startScroll();
//             paused = false;
//         }
//         else {
//             stopScroll();
//             paused = true;
//         }
//     }
// }, true);
    return (
        <div className="messages_section">
            {
                messages && messages.map((item, key) => {
                    return <div key={key}>{item.user === name ? <span className="usermessage">{item?.message}</span> :
                        <span className="clientmessage">{item?.message}
                        </span>}
                    </div>
                })
            }

        </div>
    )
}
export default Messages