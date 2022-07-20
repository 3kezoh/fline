import { Container } from '@fline/ui';
import { Route, Routes } from 'react-router-dom';
import Friends from './friends';
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
        <Route element={<Friends />} path="/friends" />
      </Routes>
    </Container>
  );
}

export default App;
