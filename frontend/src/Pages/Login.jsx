import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('Attempting login with email:', email);

    try {
      await login(email, password);
      console.log('Login successful, navigating to profile');
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <div className="login-page bg-white h-screen">
        <div className="login-container flex flex-col">
          <h2 className="">Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div> */}
  
        <div className="expt overscroll-none p-0 mx-0">
          <div className="container w-full min-w-full h-screen flex flex-col bg-white mx-0 mr-0">
            <div className="flex justify-center w-full my-auto xl:gap-14 lg:justify-normal md:gap-5">
              <div className="flex items-center justify-center w-full lg:p-10">
                <div className="flex items-center xl:p-10">
                  <form className="flex flex-col w-full h-full pb-6 text-center bg-white  border-2 border-solid border-black rounded-3xl p-2"  onSubmit={handleSubmit}>
                    <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">SIGN IN</h3>
                    {error && <div className="error-message">{error}</div>}
                    <p className="mb-4 text-grey-700">Enter your email and password</p>
                    <button className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                      <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="Google Logo" />
                      Sign in with Google
                    </button>
                    <div className="flex items-center mb-3">
                      <hr className="h-0 border-b border-solid border-grey-500 grow" />
                      <p className="mx-4 text-grey-600">or</p>
                      <hr className="h-0 border-b border-solid border-grey-500 grow" />
                    </div>
                    <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="mail@loopple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                    <div className="flex flex-row justify-between mb-8">
                      <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                          <img className="" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png" alt="tick" />
                        </div>
                        <span className="ml-3 text-sm font-normal text-grey-900">Keep me logged in</span>
                      </label>
                      <button type="button" className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</button>
                    </div>
                    <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">Sign In</button>
                    <p className="text-sm leading-relaxed text-grey-900">Not registered yet? 
                      <a href='/signup'><button type="button" className="font-bold text-grey-700">Create an Account</button></a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-wrap -mx-3 my-5">
            <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
              <p className="text-sm text-slate-500 py-1">
                Tailwind CSS Component from <a href="https://www.loopple.com/theme/motion-landing-library?ref=tailwindcomponents" className="text-slate-700 hover:text-slate-900" target="_blank" rel="noopener noreferrer">Motion Landing Library</a> by <a href="https://www.loopple.com" className="text-slate-700 hover:text-slate-900" target="_blank" rel="noopener noreferrer">Loopple Builder</a>.
              </p>
            </div>
          </div> */}
        </div>
        </>
  );
  
}
export default Login;