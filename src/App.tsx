import './App.css'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import {Layout} from "./pages/layout/layout.component.tsx";
import {Login} from "./pages/login/login.component.tsx";
import Cookies from 'js-cookie';
import {useState} from "react";

//
const loader = async () => {
  if (!Cookies.get('access_token')) {

    return redirect('../login');
  }
  return null;
};

const [user, setUser] = useState([])

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    loader: loader,

  },
  {
    path: '/login',
    element: <Login/>
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
