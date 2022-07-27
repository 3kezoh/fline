import { Container } from '@fline/ui';
import { Route, Routes } from 'react-router-dom';
import Chat from './chat';
import JoinChat from './joinChat';
import { Login } from './login';
import { Register } from './register';
import Verify from './verify';

export function App() {
  return (
    <Container>
      <Routes>
        <Route element={<div>Home</div>} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Verify />} path="/verify" />
        <Route element={<JoinChat />} path="/joinChat" />
        <Route element={<Chat />} path="/chat" />
      </Routes>
    </Container>
  );
}

export default App;
