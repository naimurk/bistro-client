import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useUsers = () => {

    const {user} = useContext(AuthContext)

  const {isLoading, refetch,  data: users = []} = useQuery({
    queryKey : ['user' , user?.email],
    queryFn : async ()=> {
        const response = await fetch('http://localhost:5000/all-users')
        return response.json()
    }
  })


    return [users , refetch , isLoading]
        
      
};

export default useUsers;