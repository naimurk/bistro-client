import  { useState, useEffect } from 'react';
const useMenu = () => {
    const [menu , setMenu] = useState([])
    useEffect (()=> {
        fetch('http://localhost:5000/menu')
        .then(res=> res.json())
        .then(data => {
            // const offered = data.filter(item => item.category == "popular")
          data &&  setMenu(data)
        } )
    },[])
    return [menu]
}
export default useMenu