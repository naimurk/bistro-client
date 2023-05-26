
import  { useState, useEffect } from 'react';
import SectionTitle from '../../../Component/SectionTitle/SectionTitle';
import SingleMenuItem from '../../Shared/SingleMenuItem/SingleMenuItem';
import useMenu from '../../../hooks/useMenu';

const MenuItem = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category == "popular")

    // const [menu , setMenu] = useState([])
    // useEffect (()=> {
    //     fetch('menu.json')
    //     .then(res=> res.json())
    //     .then(data => {
    //         const offered = data.filter(item => item.category == "popular")
    //         setMenu(offered)
    //     } )
    // },[])
//    console.log(menu);
    return (
        <div className='py-12'>
            <SectionTitle
            heading={'from our menu'}
            subHeading={'check it out'}
            ></SectionTitle>

            <div className=' grid grid-cols-2 gap-6 items-center justify-center'> 
                {
                    popular.map(item => <SingleMenuItem
                    key={item._id}
                    item={item}
                    >

                    </SingleMenuItem>)
                }
            </div>
        </div>
    );
};

export default MenuItem;