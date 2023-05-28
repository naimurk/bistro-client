
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
    const {createUser,logOut} = useContext(AuthContext)
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/login";


    const onSubmit = data => {
        // console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            logOut()
            .then(()=> {})
            .catch(error => console.log(error))
            Swal.fire('Created Account successfully ')

        })
        navigate(from, { replace: true });
    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign UP !</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        {/* field 1 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name",{ required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">name is required</span>}
                        </div>

                        {/* field 2*/}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email" , {required: true})} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">email is required</span>}
                        </div>

                        {/* field 3 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register("password",{ 
                                minLength : 8
                                // pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])$/
                             })} name="password" placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'minLength' && <p >password must have special </p>}

                        </div>

                        {/* field 4 */}
                        <div className="form-control mt-6">
                            {/* <button className="btn btn-primary">Login</button> */}
                            <input className="btn btn-primary" type="submit" value="sign up" />
                            <Link to={'/login'}><p>log in</p></Link>
                        </div>


                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default SignUp;