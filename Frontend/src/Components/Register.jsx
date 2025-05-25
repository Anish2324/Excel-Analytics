import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAdminstore';

const Register = () => {
  const [form, setForm] = useState({ fullname: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!form.fullname || !form.email || !form.password) {
      setMessage('All fields are required.');
      return;
    }
    try {
      await signup(form);
      setMessage('Registration successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage('Registration failed.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl animate-fade-in"
      style={{ animation: 'fade-in 0.7s' }}
    >
      <h1 className="text-3xl font-extrabold mb-2 text-center text-violet-700 tracking-tight">Excel Analytics</h1>
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">Register</h2>
      <div className="mb-4">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
        />
      </div>
      <div className="mb-4 relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600"
          tabIndex={-1}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-7-10-7a20.727 20.727 0 014.22-4.94M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-lg font-semibold shadow-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isSigningUp}
      >
        {isSigningUp ? 'Registering...' : 'Register'}
      </button>
      {message && (
        <p className="mt-4 text-sm text-center text-red-500 animate-fade-in">{message}</p>
      )}
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-700">Already have an account? </span>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-violet-600 hover:underline text-sm font-medium transition"
        >
          Login
        </button>
      </div>
      {/* Fade-in animation keyframes */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s;
          }
        `}
      </style>
    </form>
  );
};

export default Register;