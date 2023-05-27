
import Cover from '../../Shared/Cover/Cover';
import shopImg from "../../../assets/shop/banner2.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';

import OrderTab from '../OrderTab/OrderTab';
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import { Helmet } from 'react-helmet-async';


const OrderFood = () => {
    const [menu] = useMenu();
    const categories = ['salad', 'soup' , 'pizza', 'dessert', 'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex);
    const offered = menu.filter(item => item.category == "offered")
    const pizza = menu.filter(item => item.category == "pizza")
    const salad = menu.filter(item => item.category == "salad")
    const dessert = menu.filter(item => item.category == "dessert")
    const soup = menu.filter(item => item.category == "soup")
    const drinks = menu.filter(item => item.category == "drinks")
    // console.log(category);


    return (
        <div>
            <Helmet>
                <title>Bistro boss || order</title>

            </Helmet>
            <Cover img={shopImg} title={'Order Food'} ></Cover>
            <div className='max-w-7xl mx-auto'>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salads</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salad} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} ></OrderTab>
                </TabPanel>
            </Tabs>
            </div>
        </div>
    );
};

export default OrderFood;