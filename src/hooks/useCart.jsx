import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'


const useCart = () => {

    const {user} = useContext(AuthContext);
    // console.log(user.email);

    const { isLoading, refetch,  data: carts = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async ()=> {
            const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
            return response.json();
        },
      })
 

   return [carts , refetch, isLoading]
}

export default useCart