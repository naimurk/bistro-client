import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useAdmin = ()=> {

    const {user} = useContext(AuthContext);
    // console.log(user.email);
    const token = localStorage.getItem('access-token')

    const { isLoading, refetch,  data: isAdmin } = useQuery({
        queryKey: ['isAdmin', user?.email],

        
        queryFn: async ()=> {
            const response = await fetch(`http://localhost:5000/users/isAdmin/${user?.email}`,{
                headers : {
                    authorization : `bearer ${token}`
                }
            })
            return response.json();
        },
      })
      return [isAdmin , refetch, isLoading]
}

export default useAdmin