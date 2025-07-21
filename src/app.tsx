import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { CreateAudio } from './pages/create-audio';
import { CreateRoom } from './pages/create-room';
import { Home } from './pages/home';
import LoginForm from './pages/login';
import { Room } from './pages/room';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} index />
          <Route element={<LoginForm />} path="/login" />
          <Route element={<CreateRoom />} path="/create-room" />
          <Route element={<Room />} path="/room/:roomId" />
          <Route element={<CreateAudio />} path="/room/:roomId/audio" />
        </Routes>
        <Toaster richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
