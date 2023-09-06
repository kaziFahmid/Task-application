import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth/useAuth";

const Signup = () => {
  const { createUser } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      // Optionally, you can redirect the user after successful signup
      // Replace "/dashboard" with your desired route
      // history.push("/dashboard");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Signup failed:", error);
    }
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
            <h2 className="text-2xl font-bold text-[#002D74]">Signup</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>

            <div className="mt-6" action="#" method="POST">
              <div className="mt-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  autoComplete="true"
                  placeholder="Enter username"
                  {...register("username", { required: "Username is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    errors.username ? "border-red-500" : "focus:border-blue-500"
                  } focus:bg-white focus:outline-none`}
           
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  autoComplete="true"
                  placeholder="Enter bio"
                  {...register("bio", { required: "Bio is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    errors.bio ? "border-red-500" : "focus:border-blue-500"
                  } focus:bg-white focus:outline-none`}
         
                ></textarea>
                {errors.bio && (
                  <p className="text-red-500">{errors.bio.message}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    errors.email ? "border-red-500" : "focus:border-blue-500"
                  } focus:bg-white focus:outline-none`}
                  
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
                  {...register("password", { required: "Password is required", minLength: 6 })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    errors.password ? "border-red-500" : "focus:border-blue-500"
                  } focus:bg-white focus:outline-none`}
            
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Profile Picture</label>
                <input
                  type="text"
                  name="picture"
                  placeholder="Upload picture"
                  {...register("picture", { required: "Picture is required" })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border ${
                    errors.picture ? "border-red-500" : "focus:border-blue-500"
                  } focus:bg-white focus:outline-none`}
                />
                {errors.picture && (
                  <p className="text-red-500">{errors.picture.message}</p>
                )}
              </div>

              {/* Add other form fields as needed */}

              <button
                type="submit"
                className="w-full block btn bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Signup
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
              <p>If you have an account...</p>
              <Link to="/login">
                <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
                  Login
                </button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 md:block hidden">
            <img
              src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1694017437~exp=1694018037~hmac=4c69c4ca31c3fa8a272514f68629b7d3a8f736468e1b7d6b62d783ee43d54f50"
              className="rounded-2xl w-full h-full object-cover"
              alt="page img"
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
