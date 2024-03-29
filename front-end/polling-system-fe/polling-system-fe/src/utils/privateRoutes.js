import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';

const PrivateRoutes = () => {
  const user = useSelector(selectUser);

  if (user.userName == 'Admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoutes;
