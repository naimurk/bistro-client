

const FoodCard = ({ item }) => {
    // console.log(item);
    const { recipe, name, price, image } = item
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <p className="absolute right-10 px-8 py-3 top-10 bg-slate-900 text-white" >${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">order</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;