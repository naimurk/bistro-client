import { useContext } from "react";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useAdmin from "../../../hooks/useAdmin";
import useMenu from "../../../hooks/useMenu";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from 'sweetalert2'


const ManageItem = () => {

    
    const token = localStorage.getItem('access-token')
    const [menu , refetch] = useMenu();
    const [isAdmin]= useAdmin()
    const {user} = useContext(AuthContext)
    const handleDelete = (id) => {
       if(isAdmin){
        fetch(`http://localhost:5000/menu/${id}`,{
            method : 'DELETE',
            headers : {
                authorization : `bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount>0){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
       }
       else {
        alert('you are not admin')
       }
    }
    
    return (
        <div className="w-full h-full px-20">
            <SectionTitle heading={'manage Item'} subHeading={'you can manage'}></SectionTitle>
            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>serial</th>
        <th>Item Image</th>
        <th>Item Name </th>
        <th>price</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
       user &&  menu.map((item , index) =>  <tr key={item._id}>
            <th>{index + 1}</th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src= {item.image ? item.image : ""} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                
              </div>
            </td>
            <td>
              {item.name}
             
            </td>
            <td className="">${item.price}</td>
            <th>
                {/* to do  update option */}
              <button className="btn btn-primary btn-xs">update</button>
            </th>
            <th>
              <button onClick={()=> handleDelete(item._id)} className="btn btn-warning btn-xs">Delete</button>
            </th>
          </tr>)
     }
     
     
    
    </tbody>
  
    
  </table>
</div>
             
        </div>
    );
};

export default ManageItem;