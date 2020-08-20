import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import "./SidebarChat.css";

export const SidebarChat = ({ addNewChat }) => {
    const [seed,setSeed] = useState("");
    useEffect(() => {
        setSeed(Math.floor(Math.random()*1000));
    },[])
    const createChat = () => {
        const roomName = prompt("Enter a room name");
        if(roomName){
            console.log(roomName);
            //enter room name in firebase 
        }
    }
    return !addNewChat ?(
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>Last Message..</p>
            </div>
        </div>
    ) :
    (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}
