import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://s-blog-platform.onrender.com/api/auth/forgot-password",
        {
          email,
          newPassword,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (error) {

      setMessage(
        error.response?.data?.message
      );

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <form
          onSubmit={handleForgotPassword}
          className="flex flex-col gap-5"
        >

          <input
            type="email"
            placeholder="Enter your email"
            className="border p-4 rounded-lg outline-none"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter new password"
            className="border p-4 rounded-lg outline-none"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Update Password
          </button>

        </form>

        {message && (

          <p className="text-center mt-5 font-medium text-blue-600">
            {message}
          </p>

        )}

      </div>

    </div>
  );
}

export default ForgotPassword;