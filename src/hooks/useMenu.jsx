import { useQuery } from '@tanstack/react-query';
import  { useState, useEffect } from 'react';
const useMenu = () => {
    // const [menu , setMenu] = useState([])
    // useEffect (()=> {
    //     fetch('http://localhost:5000/menu')
    //     .then(res=> res.json())
    //     .then(data => {
    //         // const offered = data.filter(item => item.category == "popular")
    //       data &&  setMenu(data)
    //     } )
    // },[])
    // return [menu]
    const {data: menu = [], refetch, isLoading} = useQuery({
        queryKey : ['menu'],
        queryFn : async ()=> {
            const response = await fetch('http://localhost:5000/menu')
            return response.json()
        }
    })
    return [menu, refetch, isLoading]
}
export default useMenu