
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import FeatureItem from '../FeatureItem/FeatureItem';
import MenuItem from '../MenuItem/MenuItem';
import Testomonial from '../Testomonial/Testomonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro boss || Home</title>

            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <MenuItem></MenuItem>
            <FeatureItem></FeatureItem>
            <Testomonial></Testomonial>
        </div>
    );
};

export default Home;