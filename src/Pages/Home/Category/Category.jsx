import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../../assets/home/slide1.jpg"
import slide2 from "../../../assets/home/slide2.jpg"
import slide3 from "../../../assets/home/slide3.jpg"
import slide4 from "../../../assets/home/slide4.jpg"
import slide5 from "../../../assets/home/slide5.jpg"
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const Category = () => {
    return (
        <div className="py-12">
            <SectionTitle
            heading={'order online'}
            subHeading={'from 11am to 10pm'}
            >

            </SectionTitle>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={slide1} alt="" /> <h1 className=" uppercase text-3xl text-white -mt-12">salad</h1></SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" /><h1 className=" uppercase text-3xl text-white -mt-12">Pizza</h1></SwiperSlide>
                <SwiperSlide><img src={slide3} alt="" /><h1 className=" uppercase text-3xl text-white -mt-12">Soap</h1></SwiperSlide>
                <SwiperSlide><img src={slide4} alt="" /><h1 className=" uppercase text-3xl text-white -mt-12">Cake</h1></SwiperSlide>
                <SwiperSlide><img src={slide5} alt="" /><h1 className=" uppercase text-3xl text-white -mt-12">salad</h1></SwiperSlide>
                
                
            </Swiper>
        </div>
    );
};

export default Category;