import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    document.title = "Login | MotoPOS";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate login validation
    if (email === "admin@example.com" && password === "admin123") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-500">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto h-20 animate__animated animate__zoomIn"
          />
          <h1 className="text-3xl font-extrabold text-gray-800 mt-4">Welcome Back!</h1>
          <p className="text-sm text-gray-600 mt-1">Please log in to your account to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-4">
          {error && (
            <div className="text-red-500 text-center font-semibold mb-4 animate__animated animate__fadeIn">
              {error}
            </div>
          )}
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-500 ease-in-out"
            />
          </div>

          <div className="animate__animated animate__fadeIn animate__delay-1.2s">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-500 ease-in-out"
            />
          </div>

          <div className="flex justify-center animate__animated animate__fadeIn animate__delay-1.5s">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 animate__animated animate__fadeIn animate__delay-2s">
          Don’t have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Contact your admin
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
