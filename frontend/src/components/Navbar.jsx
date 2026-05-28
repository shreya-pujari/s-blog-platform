import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-black text-white px-8 py-4 flex justify-between items-center">

      <Link to={token ? "/blogs" : "/"}>
        <h1 className="text-2xl font-bold">
          Blog Platform
        </h1>
      </Link>

      <div className="flex gap-6 items-center">

        {
          token ? (
            <>
              <Link to="/create">
                Create
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/">
                Home
              </Link>

              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>
            </>
          )
        }

      </div>

    </div>
  );
}

export default Navbar;