import React from 'react';

const SingleMenuItem = ({item}) => {
    // console.log(item);
    const {price, image , name, _id , recipe} = item
    // console.log(img);
    return (
        <div className='flex items-center gap-x-5 justify-center'>
            <img style={{borderRadius : '0 200px 200px 200px'}} className='w-28' src= {image} alt="" />
            <div className='w-1/2'>
                <h3 className='text-xl uppercase'>{name}------------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-400 font-bold'>$ {price}</p>
        </div>
    );
};

export default SingleMenuItem;