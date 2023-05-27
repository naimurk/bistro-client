import FoodCard from "../../../Component/FoodCard/FoodCard";


const OrderTab = ({ items }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-7">
            {
                items.map(item => <FoodCard
                    key={item._id}
                    item={item}
                >

                </FoodCard>)
            }
        </div>
    );
};

export default OrderTab;