import React, { useEffect } from 'react';
import { authenticate } from '@fline/security';
import { Button, Input } from '@fline/ui';
import { useState } from 'react';

function Chat(socket, username, room) {
  const [messages, setMessages] = useState('');
  const [list, setList] = useState([]);

  const sendMessage = async () => {
    if (messages !== '') {
      const messageData = {
        room: room,
        auteur: username,
        message: messages,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setList((list) => [...list, data]);
      //console.log(data);
      setMessages('');
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {list.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.auteur ? 'me' : 'mate'}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="auteur">{messageContent.auteur}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <Input
          onChange={(event) => {
            setMessages(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
          placeholder="Ecris là"
          type="text"
          value={messages}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
export default Chat;
