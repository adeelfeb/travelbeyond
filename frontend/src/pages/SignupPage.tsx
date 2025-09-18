import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiLogIn } from 'react-icons/fi';
import TextField from '../components/TextField';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup logic
    localStorage.setItem('authToken', 'dummy-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-gray-600">
              Join us today and unlock amazing features
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextField
              label="Username (Optional)"
              type="text"
              value={username}
              onChange={setUsername}
              startIcon={<FiUser />}
            />
            
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              required
              startIcon={<FiMail />}
            />
            
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
              startIcon={<FiLock />}
            />

            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FiLogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                </span>
                Sign up
              </button>
            </div>
            
            <div className="text-center mt-4">
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 inline-flex items-center"
              >
                Already have an account? Sign in
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Signup;