import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useEffect, useState } from "react";
import icon from '../../../assets/icon/quote.png'

const Testomonial = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    // console.log(reviews);
    return (
        <div className="lg:p-24">
            <SectionTitle heading={'testimonials '} subHeading={'what our clients say  '} ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                <div>
                    {
                        
                            reviews && reviews.map(review => <SwiperSlide key={review?._id}>

                                <div className="text-center flex flex-col gap-y-5 justify-center items-center">
                                    <Rating style={{ maxWidth: 250 }} value={review?.rating} />
                                    <img src={icon} alt="" />
                                    <p className="lg:w-1/2">{review?.details}</p>
                                    <p className="text-yellow-600 text-xl">{review?.name}</p>
                                </div>
                            </SwiperSlide>
                            )
                    
    
                 }
                </div>
            </Swiper>
        </div>
    );
};

export default Testomonial;