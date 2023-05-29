import {createBrowserRouter} from 'react-router-dom'
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Profile from '../components/Profile';


export const publicRoutes = createBrowserRouter([
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/register",
      element: <RegisterForm/>,
    },
]);

export const privateRoutes = createBrowserRouter([
  {
    path: "/profile",
    element: <Profile />,
  },
]);
