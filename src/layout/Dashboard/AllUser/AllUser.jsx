import useUsers from "../../../hooks/useUsers";
import { FaUserLock} from 'react-icons/fa';
import { AiFillDelete} from 'react-icons/ai';
const AllUser = () => {
    const [users, refetch] = useUsers()
    console.log(users);
    const handleMakeAdmin = (id) => {
       fetch(`http://localhost:5000/users/admin/${id}`,{
        method : 'PATCH'
       })
       .then(res => res.json())
       .then(data => {
        console.log(data);
        if(data.modifiedCount> 0){
            refetch()
        }
       })
    }
    return (
        <div>
            <h3 className="text-start text-3xl font-bold">Total Users : {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                       
                        {
                            users && users.map((user, index) =>  <tr
                            key={user._id}
                            >
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role == 'Admin' ? 'Admin' : <button onClick={()=> handleMakeAdmin(user._id)}  className="btn border-0 btn-md bg-yellow-500 rounded-sm"><FaUserLock></FaUserLock></button> }</td>
                                <td><button className="btn btn-md bg-red-500 border-0  rounded-lg"><AiFillDelete></AiFillDelete></button></td>
                                {/* to do  delete option */}
                                <th><button className="btn btn-primary btn-xs" >Delete</button></th>
                            </tr>)
                        }
                        

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;