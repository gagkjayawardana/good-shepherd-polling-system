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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAction());
    dispatch(getEventAction());
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
