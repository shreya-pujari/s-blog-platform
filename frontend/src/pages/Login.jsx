import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://s-blog-platform.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      setMessage(response.data.message);

      setTimeout(() => {

        navigate("/blogs");

      }, 1000);

    } catch (error) {

      setMessage(error.response.data.message);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        {
          message && (
            <p className="bg-blue-100 text-blue-700 p-3 rounded-lg mb-4 text-center">
              {message}
            </p>
          )
        }

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          <input
            type="email"
            placeholder="Enter your email"
            className="border p-3 rounded-lg outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="border p-3 rounded-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Login
          </button>

        </form>

        <p className="text-center mt-5 text-gray-600">

          Forgot Password?

          <Link
            to="/forgot-password"
            className="text-blue-600 ml-2"
          >
            Reset
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
