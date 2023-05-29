import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";




const FoodCard = ({ item }) => {
    // console.log(item);
    const navigate = useNavigate();
    const location = useLocation();
    const { recipe, name, price, image, _id } = item;
    const {user} = useContext(AuthContext)
    // console.log(user.email);
    const [,refetch] = useCart()
    const handleAddToCart = (item) => {
        // console.log(item);
        const {recipe, name, price, image, _id } = item;
        
        
        if(user && user?.email ){
            const oderItem = {foodId : _id , name, price, image , recipe , Useremail: user.email}
            fetch('http://localhost:5000/carts',
             {
                method : 'POST', 
                headers : {
                   'content-type' : 'application/json' 
                },
                body : JSON.stringify(oderItem)
            }
            
            )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.insertedId){
                    refetch()
                    Swal.fire({
                        position: 'item added successfully',
                        icon: 'success',
                        title: 'item added successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }

        else {
            Swal.fire({
                title: 'login to add?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'login!'
              }).then((result) => {
                if (result.isConfirmed) {
                //  important thing
                  navigate('/login',{state : {from : location}})
                }
              })
        }
    }
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
                    <button onClick={ ()=> handleAddToCart(item)} className="btn btn-primary">order</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;