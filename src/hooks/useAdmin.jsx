import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useAdmin = ()=> {

    const {user,loading} = useContext(AuthContext);
    // console.log(user.email);
    const token = localStorage.getItem('access-token')

    const { isLoading, refetch,  data: isAdmin } = useQuery({
        queryKey: ['isAdmin', user?.email],

        
        queryFn: async ()=> {
            if(!loading && user?.email){
                const response = await fetch(`http://localhost:5000/users/admin/${user?.email}`,{
                headers : {
                    authorization : `bearer ${token}`
                }
            })
            return response.json();
            }
        },
        // Enable the query only when not loading and user email is available
        enabled: !loading && !!user?.email
      })
      return [isAdmin , refetch, isLoading]
}

export default useAdmin