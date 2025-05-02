import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    document.title = "Login | MotoPOS";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the JWT in localStorage (or cookies, if you prefer)
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
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
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
