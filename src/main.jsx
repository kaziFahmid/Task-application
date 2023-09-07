import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './Components/Main/Main.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home';
import CreateTeam from './Components/CreateTeam/CreateTeam';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Registration/Login';
import Signup from './Components/Registration/Signup';
import AuthProvider from './Components/AuthProvider/AuthProvider';
import { TaskProvider } from './Components/TaskProvider/TaskProvider';
import AllUsers from './Components/AllUsers/AllUsers';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path:'/allusers',
        element:<AllUsers/>
      },
      {
        path: "/createteam",
        element: <CreateTeam/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <AuthProvider>
<TaskProvider>
<RouterProvider router={router} />
</TaskProvider>

 </AuthProvider>

  </React.StrictMode>,
)
