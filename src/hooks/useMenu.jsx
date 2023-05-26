import  { useState, useEffect } from 'react';
const useMenu = () => {
    const [menu , setMenu] = useState([])
    useEffect (()=> {
        fetch('menu.json')
        .then(res=> res.json())
        .then(data => {
            // const offered = data.filter(item => item.category == "popular")
            setMenu(data)
        } )
    },[])
    return [menu]
}
export default useMenu