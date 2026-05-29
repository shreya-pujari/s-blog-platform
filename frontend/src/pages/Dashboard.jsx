import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}</h1>

      <div className="dashboard-buttons">
        <Link to="/blogs">
          <button>View Blogs</button>
        </Link>

        <Link to="/create">
          <button>Create Blog</button>
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;