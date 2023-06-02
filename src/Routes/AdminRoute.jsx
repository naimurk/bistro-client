import {useContext} from 'react'
import { AuthContext } from '../Provider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
 
    const {user , loading}=useContext(AuthContext);
    const {isAdmin ,isLoading}= useAdmin();
    const location = useLocation()

    if(loading || isLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (isAdmin && user){
        return children
    }
    return <Navigate to={'/'} state={{from : location}} replace ></Navigate>
       
            
        
   
};

export default AdminRoute;