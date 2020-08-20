import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './stateProvider';
import firebase from 'firebase';

export const Chat = () => {
    const [seed,setSeed] = useState("");
    const [input,setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();
    useEffect(() => {
        console.log(roomId)
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapShot) => (
                setRoomName(snapShot.data().name)
            ))

            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .orderBy("timestamp","asc")
              .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
                             
        }
    },[roomId])
    useEffect(() => {
        setSeed(Math.floor(Math.random()*1000));
    },[])
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen 
                        {
                            new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {
                    messages.map((message) => (
                        <p className={`chat__message ${user.displayName === message.name && "chat__reciever"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">
                                {
                                    new Date(message.timestamp?.toDate()).toUTCString()
                                }
                            </span>
                        </p>
                    ))
                }
                
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message" 

                    />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />

            </div>
        </div>
    )
}
