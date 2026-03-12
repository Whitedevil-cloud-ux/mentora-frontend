import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/login-image.svg";

const Signup = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "parent"
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    await api.post("/auth/signup", form);

    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Image */}
      <div className="hidden md:flex items-center justify-center bg-green-600">

        <img
          src={signupImage}
          alt="Signup"
          className="w-[70%] animate-float"
        />

      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              placeholder="Name"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="parent">Parent</option>
              <option value="mentor">Mentor</option>
            </select>

            <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
              Signup
            </button>

          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Signup;