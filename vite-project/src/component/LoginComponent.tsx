import React from 'react';
import { Props } from '../types/LoginTypes';
import { Link } from 'react-router-dom';



const LoginComponent: React.FC<Props> = ({ loading, formikProps,errorMessage  }) => {
  console.log('errorMessage: ', errorMessage);
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-100">
       <video 
        autoPlay 
        loop 
        muted 
        className="absolute z-0 w-full h-full min-w-full min-h-full object-cover"
      >
        <source src="../../public/video/NEW Premier League 2023_24 Matchday Intro.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-wrap items-center justify-center lg:justify-between w-full">
    
        <div className="flex items-center justify-center  md:w-9/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="https://2.bp.blogspot.com/-C_LxjmYfxv0/Vrt-dBwdyBI/AAAAAAAACDs/UFeYSwkk24w/s1600/epl-logo-1403079007.png"
            className="w-full"
            alt="Sample"
          />
        </div>
        
        {/* Right Column */}
        <div className="w-full md:w-8/12 lg:w-5/12 bg-opacity-50 bg-white backdrop-blur-md p-8 rounded-lg shadow-md mr-5">
  <h1 className='text-4xl font-bold text-blue-500 mb-4 text-center'>Login</h1>
  <form onSubmit={formikProps.handleSubmit} className="space-y-4">
    {/* Email Input */}
    <div className="mb-4 relative p-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        value={formikProps.values.email}
        className="mt-1 p-2 w-full rounded-md border peer bg-opacity-80"
      />
      {formikProps.touched.email && formikProps.errors.email ? (
        <div className="text-red-500 text-sm mt-1">{formikProps.errors.email}</div>
      ) : null}
    </div>

    {/* Password Input */}
    <div className="mb-4 relative p-2">
      <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        value={formikProps.values.password}
        className="mt-1 p-2 w-full rounded-md border peer bg-opacity-80"
      />
      {formikProps.touched.password && formikProps.errors.password ? (
        <div className="text-red-500 text-sm mt-1">{formikProps.errors.password}</div>
      ) : null}
    </div>

    {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
    
    {/* Login Button */}
    <div className="text-center mt-4 flex flex-col items-center">
      <button 
        type="submit" 
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-2"
      >
        Login
      </button>
      <div className="flex items-center">
        <p className="text-sm font-semibold mb-0 mr-1">
          Don't have an account?
        </p>
        <Link to="/register" className="text-blue-500 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700">
          Register
        </Link>
      </div>
    </div>
  </form>
</div>

      </div>
    </section>
  );
};

export default LoginComponent;
