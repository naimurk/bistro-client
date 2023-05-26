import React from 'react';
import Cover from '../../Shared/Cover/Cover';
import SingleMenuItem from '../../Shared/SingleMenuItem/SingleMenuItem';

const MenuCategory = ({title, img , items}) => {
    return (
        <div className='mb-12'>
            <Cover title={title} img={img} ></Cover>
            <div className=' py-12 grid grid-cols-2 gap-6 items-center justify-center'> 
                {
                    items.map(item => <SingleMenuItem
                    key={item._id}
                    item={item}
                    >

                    </SingleMenuItem>)
                }
            </div>
        </div>
    );
};

export default MenuCategory;