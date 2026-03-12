import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login-image.svg";

const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", { email, password });

    login(res.data.token);
    navigate("/");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Section */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 relative overflow-hidden">

        <img
          src={loginImage}
          alt="Education"
          className="w-[70%] animate-float"
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>

          </form>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold">
              Signup
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;