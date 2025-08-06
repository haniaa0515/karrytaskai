import React, { useState } from "react";
import { ArrowRight, Mail, Lock, Bot } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to KarryTask page
    window.location.href = "/karrytask";
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            
            <span className="font-display font-bold text-2xl text-gray-900">KarryTask</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Sign in to your productivity AI dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input id="email" name="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent" placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input id="password" name="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent" placeholder="Enter your password" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-pulse-500 focus:ring-pulse-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-pulse-500 hover:text-pulse-600">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-pulse-500 text-white py-3 px-4 rounded-lg hover:bg-pulse-600 transition-colors duration-200 font-medium">
            <span>Sign in to KarryTask</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-pulse-500 hover:text-pulse-600 font-medium">
                Sign up for free
              </a>
            </p>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Quick start demo</span>
            </div>
          </div>

          <div className="mt-6">
            <button onClick={() => window.location.href = "/karrytask"} className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
              <span>Continue as Guest</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;