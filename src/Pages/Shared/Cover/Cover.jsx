
import { Parallax, Background } from 'react-parallax';
const Cover = ({ img, title }) => {
    // console.log(img);
    return (
        

            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={img}
                bgImageAlt="the dog"
                strength={-200}
            >
                
                <div className="hero h-[700px]" >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content w-[800px] bg-opacity-50 bg-black p-24 text-center text-neutral-content">
                    <div className="  ">
                        <h1 className="mb-5 uppercase text-5xl font-bold">{title}</h1>
                        <p className=" uppercase mb-5">would you like to dish ?</p>

                    </div>
                </div>
            </div>
            </Parallax>
            
        
    );
};

export default Cover;