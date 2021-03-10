import React, {useState,  Component } from 'react';
import {auth, firestore}  from '../services/firebase'
import firebase from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import scrollToBottom from 'react'

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
        <button class="to-bottom-button" type="button" onClick={scrollToBottomOfChat}>Click Here To Scroll To Newest Chat Messages!</button>
        <div class= "chat-grid">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        </div>
  
        <form class="chat-form" style={{ marginTop: '0px', marginRight: 'auto', marginBottom: '50px', marginLeft: 'auto', maxWidth: '800px', paddingTop: '0px', paddingRight: '20px', paddingBottom: '0px', paddingLeft: '20px' }} onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Send a message!" />
  
          <button type="submit" disabled={!formValue}>Send</button>
        </form>
        <button class="to-top-button" type="button" onClick={scrollToTopOfChat}>Click Here To Scroll To Oldest Chat Messages!</button>
      </>
    )
  }
  
  function ChatMessage(props){
  
    const {text, uid, photoURL} = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
  
    return (
      <div class="chat-body">
		  <div class="chat-container">
        <a href= {'profile/' + uid}><img src = {photoURL}/></a>
        <p>{text}</p>
      </div>
	  
	  </div>
    )
  }

  function scrollToBottomOfChat() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  function scrollToTopOfChat() {
    window.scroll({
      top: 0,
      left: 0, 
      behavior: 'smooth',
    });
  }
