import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuBg from '../../../assets/menu/banner3.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'

import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu()
    const offered = menu.filter(item => item.category == "offered")
    const pizza = menu.filter(item => item.category == "pizza")
    const salad = menu.filter(item => item.category == "salad")
    const dessert = menu.filter(item => item.category == "dessert")
    const soup = menu.filter(item => item.category == "soup")
    return (
        <div>
            <Helmet>
                <title>Bistro boss || menu</title>

            </Helmet>


            {/* offered part 1 */}
            <MenuCategory
                title='our menu'
                img={menuBg}
                items = {offered}
             ></MenuCategory>

            {/* dessert part 2 */}
            <MenuCategory
                title='Dessert'
                img={dessertImg}
                items = {dessert}
             ></MenuCategory>

            {/* pizza part 3 */}
            <MenuCategory
                title='our menu'
                img={pizzaImg}
                items = {pizza}
             ></MenuCategory>

            {/* salad part 4 */}
            <MenuCategory
                title='Salads'
                img={saladImg}
                items = {salad}
             ></MenuCategory>
             
            {/* soup part 5 */}
            <MenuCategory
                title='soup'
                img={soupImg}
                items = {soup}
             ></MenuCategory>
             
        </div>
    );
};

export default Menu;