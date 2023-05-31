
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
    const [allUser , setAllUser] = useState([])
    const { createUser, logOut, UserUpdateProfile } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/login";
    useEffect(()=> {
        fetch('http://localhost:5000/all-users')
        .then(res => res.json())
        .then(data => setAllUser(data) )
    },[])
    
    // console.log(allUser.email);

    const onSubmit = data => {
        // console.log(data)
        const person = allUser.find(s => s.email === data.email)
       if (person?.email) {
        Swal.fire({
            icon: 'error',
            title: 'Email already used!',
            text: '',
            
          })
       }
       else {
             
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);

            // update function call here 
            UserUpdateProfile(data.name, data.photo)
                .then(() => {
                    const saveUser = { name: data.name, email: data.email }
                    fetch('http://localhost:5000/users', {
                        method: "POST",
                        headers: {
                            'content-type': "application/json"
                        },
                        body: JSON.stringify(saveUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                reset();
                                // login function call here 
                                logOut()
                                    .then(() => { })
                                    .catch(error => console.log(error))
                                Swal.fire('Created Account successfully ')
                                navigate(from, { replace: true });

                            }
                        })

                })



        })


       }
        

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
                            <input type="text"  {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">name is required</span>}
                        </div>
                        {/* field photo url */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo url</span>
                            </label>
                            <input type="text"  {...register("photo", { required: true })} placeholder="name" className="input input-bordered" />
                            {errors.photo && <span className="text-red-500">photo url is required</span>}
                        </div>

                        {/* field 2*/}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">email is required</span>}
                        </div>

                        {/* field 3 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register("password", {
                                minLength: 8
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

                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </div>
    );
};

export default SignUp;