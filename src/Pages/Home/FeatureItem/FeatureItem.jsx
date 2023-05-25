
import SectionTitle from '../../../Component/SectionTitle/SectionTitle';
import img from "../../../assets/home/featured.jpg"
import './feature.css'

const FeatureItem = () => {
    return (
        <div className='feature bg-fixed text-white p-24'>
            <SectionTitle  heading={"feature item"} subHeading={'check it out'} 
            ></SectionTitle>
            <div className='md:flex justify-center gap-x-9 items-center'>
                <img className='w-[648px]' src={img} alt="" />
                <div>
                     <p className='uppercase'>march 20 , 2023</p>
                     <h3 className='text-2xl uppercase'>where can i get some ?</h3>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tene</p>

                </div>
            </div>
        </div>
    );
};

export default FeatureItem;