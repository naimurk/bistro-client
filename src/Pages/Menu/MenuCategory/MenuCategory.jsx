import React from 'react';
import Cover from '../../Shared/Cover/Cover';
import SingleMenuItem from '../../Shared/SingleMenuItem/SingleMenuItem';
import { Link } from 'react-router-dom';

const MenuCategory = ({ title, img, items, category  }) => {
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
            <div className='flex flex-col justify-center items-center'>
                <Link to={`/order/${category}`} ><button className='  btn btn-outline border-0 uppercase border-b-4'>order your favorite food  </button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;