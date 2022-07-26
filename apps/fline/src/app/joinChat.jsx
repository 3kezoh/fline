import { useAuthentication, useForm } from '@fline/hooks';
import { Button, Grid, Input } from '@fline/ui';
import io from 'socket.io-client';
import { chat } from '@fline/chat';
import { useState } from 'react';
import Chat from './chat';

const socket = io.connect('http://localhost:3333');

const formInitialState = {
  roomID: '',
};

export function JoinChat() {
  const { error, joinChat } = useAuthentication();

  const [formData, onSubmit] = useForm(formInitialState, () =>
    joinChat(formData)
  );

  const { roomID } = formData;

  //recuperer le USER içi

  //const user =

  //const [username, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  // Ajouter le user connecté à la condition de connexion à la room
  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <Grid spacing={2}>
            <Input
              isRequired
              label="RoomID"
              name="roomID"
              onChange={(event) => setRoom(event.target.value)}
              type="text"
              value={roomID}
            />
            <Button onClick={joinRoom}>Rejoindre</Button>
          </Grid>
        </div>
      ) : (
        <Chat room={room} socket={socket} />
      )}
    </div>
  );
}
export default JoinChat;
