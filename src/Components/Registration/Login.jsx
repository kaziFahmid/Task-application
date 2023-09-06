import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import data from './data.json';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth/useAuth';

const Login = () => {
    const{signInUser}=useAuth()
    let navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const onSubmit = async (data) => {
 signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire('Login Done')
    navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl"
        >
          <div className="md:w-1/2 px-5">
            <Link to="/">
              <button className="mb-2 btn ">Go back to home</button>
            </Link>
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have no account, please Signup
            </p>

            <div className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format',
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    errors.email ? 'border-red-500' : 'focus:border-blue-500'
                  } focus:bg-white focus:outline-none`}
                  autoFocus
                  autoComplete="required"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="true"
                  placeholder="Enter Password"
                  minLength="6"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    errors.password ? 'border-red-500' : 'focus:border-blue-500'
                  } focus:bg-white focus:outline-none`}
                 
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
              </button>
            </div>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                {/* Your Google login SVG */}
              </svg>
              <span className="ml-4">Login with Google</span>
            </button>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <Link to="/signup">
                <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
                  Register
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 md:flex justify-center items-center hidden">
            <div>
              <Lottie options={defaultOptions} />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
