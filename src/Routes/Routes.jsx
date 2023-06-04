import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import OrderFood from "../Pages/order/order_Food/OrderFood";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard/Dashboard/Dashboard";
import Mycart from "../layout/Dashboard/MyCart/Mycart";
// import PrivateRoute from "./PrivateRoute";
import AllUser from "../layout/Dashboard/AllUser/AllUser";
import Additem from "../layout/Dashboard/AddItem/Additem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../layout/Dashboard/ManageItem/ManageItem";
// import PrivateRoute from "./PrivateRoute";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path : '/',
            element : <Home></Home>
        },
        {
          path : '/menu',
          element : <Menu></Menu>
          
        },
        {
          path : '/order/:category',
          element : <OrderFood></OrderFood>
        },
        {
          path : 'login',
          element : <Login></Login>
        },
        {
          path : 'signup',
          element : <SignUp></SignUp>
        }
      ]
    },
    {
      path : 'dashboard',
      element : <Dashboard></Dashboard>,
      children : [
        {
          path : 'my-cart',
          element : <Mycart></Mycart>
        },
        {
          path : 'all-users',
          element : <AllUser></AllUser>
        },
        {
          path : 'add-item',
          element : <Additem></Additem>
        },
        {
          path : 'manage-item',
          element : <ManageItem></ManageItem>
        },
      ]
    }
  ]);