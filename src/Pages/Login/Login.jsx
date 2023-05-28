import { useContext, useEffect,  useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const Login = () => {

    const [disable , setDisable] = useState(true)

   const {signIn} = useContext(AuthContext)
   const navigate = useNavigate();
   const location = useLocation();
   let from = location.state?.from?.pathname || "/";

    useEffect(()=> {
        loadCaptchaEnginge(4);
    },[])

    // const captchaRef = useRef(null)

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email,password)
        .then(result => {
            const user = result.user ;
            console.log(user)
            Swal.fire('login successfully ')
        })
        navigate(from, { replace: true });

    }
   
    const handleValidateCaptcha = (e) => {
        const value = e.target.value;
        if (validateCaptcha(value)) {
            setDisable(false)
        }
        else{
           setDisable(true)
        }
    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <form onSubmit={handleLogin} className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" required name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" required name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                      {/* captcha here */}
                        
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input  onBlur={handleValidateCaptcha} type="text" required name="captcha"  placeholder="captcha" className="input input-bordered" />
                            {/* <button className='btn btn-xs' onClick={handleValidateCaptcha} >validate</button> */}

                        </div>


                        <div className="form-control mt-6">
                            {/* <button >Login</button> */}
                            <input disabled = {disable}  className="btn btn-primary" type="submit" value="login" />
                            <Link to={'/signup'}> <p>create an account</p> </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;