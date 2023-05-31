import { NavLink, Outlet } from "react-router-dom";
import { FaCalendar, FaHome,FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { GiWallet } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';
import useCart from "../../../hooks/useCart";



const Dashboard = () => {
    const [carts] = useCart();
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* <!-- Page content here --> */}
                  
                  <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                <ul className="menu p-4 w-80 bg-yellow-500 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><NavLink to={'/userhome'}><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to={'reservation'}><FaRegCalendarAlt></FaRegCalendarAlt>Reservation</NavLink></li>
                    <li><NavLink to={'payment-history'}><GiWallet></GiWallet>Payment History</NavLink></li>
                    <li><NavLink to={'/dashboard/mycart'} ><BsFillCartCheckFill></BsFillCartCheckFill>My Cart <span className="btn btn-xs bg-red-600">{carts.length}</span>  </NavLink></li>

                    <div className="divider py-5"></div> 
                    <li><NavLink to={'/'}><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to={'/menu'}><HiMenu></HiMenu>Menu</NavLink></li>
                    <li><NavLink to={'/order/salad'}><FaCalendar></FaCalendar>Order</NavLink></li>
                    
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;