import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://s-blog-platform.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      setMessage(response.data.message);

      setName("");

      setEmail("");

      setPassword("");

    } catch (error) {

      setMessage(error.response.data.message);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        {
          message && (
            <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
              {message}
            </p>
          )
        }

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            placeholder="Enter your name"
            className="border p-3 rounded-lg outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Signup
          </button>

        </form>

        <p className="text-center mt-5 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;
