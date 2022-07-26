import { Container } from '@fline/ui';
import { Route, Routes } from 'react-router-dom';
import ChangePassword from './change-password';
import { Login } from './login';
import { Register } from './register';
import ResetPassword from './reset-password';
import Verify from './verify';

export function App() {
  return (
    <Container>
      <Routes>
        <Route element={<div>Home</div>} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Verify />} path="/verify" />
        <Route element={<ResetPassword />} path="/reset-password" />
        <Route element={<ChangePassword />} path="/change-password" />
      </Routes>
    </Container>
  );
}

export default App;
