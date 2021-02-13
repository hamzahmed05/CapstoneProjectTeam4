import React, {useState,  Component } from 'react';
import {auth, firestore}  from '../services/firebase'
import firebase from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './chat-Style.css';


export default function ChatRoom() {
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(50);
    const [messages] = useCollectionData(query, {idField: 'id'});
  
    const [formValue, setFormValue] = useState('');
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const{uid, photoURL} = auth.currentUser;
  
      await messageRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
    }
    return (
      <>
        <div id="chat-grid">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        </div>
  
        <form id ="send-message" onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Send a message!" />
  
          <button type="submit" disabled={!formValue}>Send</button>
        </form>
      </>
    )
  }
  
  function ChatMessage(props){
  
    const {text, uid, photoURL} = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
  
    return (
      <div className={`message ${messageClass}`}>
        <img src = {photoURL}/>
        <p>{text}</p>
      </div>
    )
  }
