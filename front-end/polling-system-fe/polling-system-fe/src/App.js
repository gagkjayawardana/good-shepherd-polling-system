import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AdminPage from './pages/Admin/Admin';
import LoginPage from './pages/Login/Login';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserAction } from './redux/user/userSlice';
import PrivateRoutes from './utils/privateRoutes';
import { getEventAction } from './redux/event/eventSlice';
import { getVotesAction } from './redux/vote/voteSlice';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/', {
  transports: ['websocket']
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAction());
    dispatch(getEventAction());
    dispatch(getVotesAction());
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket Id ', socket.id);
    });

    socket.on('vote_added', () => {
      // alert(data);
      dispatch(getVotesAction());
    });

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.off();
    };
  }, []);
  return (
    <>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
