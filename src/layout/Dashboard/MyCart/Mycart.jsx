import useCart from "../../../hooks/useCart";
import { AiTwotoneDelete } from 'react-icons/ai';
import Swal from 'sweetalert2'


const Mycart = () => {
    const [carts, refetch] = useCart()
    //  console.log(carts);
    const total = carts.reduce((sum, item) => sum + item.price, 0)


    const handleDelete = (item) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/carts/${item.foodId}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            <div className="flex justify-between gap-x-24 ">
                <h1 className="text-3xl">items you have added : {carts.length}</h1>
                <h1 className="text-3xl">Total price{total}</h1>
                <button className="btn btn-warning">pay</button>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>serial no </th>
                            <th>item image </th>
                            <th>item name </th>
                            <th>price</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            carts.map((item, index) => <tr
                                key={item._id}
                            >
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}


                                </td>
                                <td>{item.price}</td>
                                <td><button onClick={() => handleDelete(item)} className="btn btn-sm rounded-full"><AiTwotoneDelete></AiTwotoneDelete></button></td>

                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Mycart;