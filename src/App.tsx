import './App.css'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import {Layout} from "./pages/layout/layout.component.tsx";
import {Login} from "./pages/login/login.component.tsx";
import Cookies from 'js-cookie';
import {UserContainerComponent} from "./components/user-container/user-container.component.tsx";


const loader = async () => {
  if (!Cookies.get('at')) {
    let valid_until : number = Number(Cookies.get('vu'));
    const unix_now : number = Date.now() / 1000;
    if (valid_until<=unix_now || isNaN(valid_until)) {
      return redirect('../login');
    }

  }
  return null;
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    loader: loader,
    children: [
      {
        path: '/user/:id',
        element: <UserContainerComponent/>
      }
    ]
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
