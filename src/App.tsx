import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "./pages/layout/layout.component.tsx";
// import Cookies from 'js-cookie';

//
// const loader = async () => {
//   if (!Cookies.get('access_token')) {
//     return redirect('../login');
//   }
//   return null;
// };

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    // loader: loader,

  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
