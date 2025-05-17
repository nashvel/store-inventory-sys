import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Login ";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendVerificationCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send verification code");
      }

      setCodeSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8080/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid verification code");
      }

      // Store the JWT in localStorage
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-3xl font-extrabold text-gray-800 mt-4">
            {showForgotPassword ? "Password Recovery" : "Welcome Back!"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {showForgotPassword
              ? "Enter your email to receive a verification code"
              : "Please log in to your account to continue."}
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-center font-semibold mb-4 animate__animated animate__fadeIn">
            {error}
          </div>
        )}

        {!showForgotPassword ? (
          // Regular login form
          <form onSubmit={handleSubmit} className="space-y-5 px-4">
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
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        ) : !codeSent ? (
          // Email form for forgot password
          <form onSubmit={handleSendVerificationCode} className="space-y-5 px-4">
            <div className="animate__animated animate__fadeIn">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-500 ease-in-out"
              />
            </div>

            <div className="flex justify-center animate__animated animate__fadeIn">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Verification Code"}
              </button>
            </div>
          </form>
        ) : (
          // Verification code form
          <form onSubmit={handleVerifyCode} className="space-y-5 px-4">
            <div className="animate__animated animate__fadeIn">
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                placeholder="Enter code sent to your email"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-transform duration-500 ease-in-out"
              />
            </div>

            <div className="flex justify-center animate__animated animate__fadeIn">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Verifying..." : "Verify & Login"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600 animate__animated animate__fadeIn animate__delay-2s">
          {showForgotPassword ? (
            <>
              Remember your password?{" "}
              <span
                onClick={() => {
                  setShowForgotPassword(false);
                  setCodeSent(false);
                  setError("");
                }}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Back to Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;