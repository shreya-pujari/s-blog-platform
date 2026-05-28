import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="text-center max-w-4xl">

        <h1 className="text-6xl font-bold leading-tight text-gray-900">

          Share Your

          <span className="text-blue-600">
            {" "}Stories{" "}
          </span>

          With The World

        </h1>

        <p className="text-gray-600 text-xl mt-8">
          Create blogs, express your thoughts,
          and connect with readers across the globe.
        </p>

        <Link to="/signup">

          <button className="mt-10 bg-black text-white px-10 py-4 rounded-2xl text-xl font-semibold hover:bg-gray-800 transition">

            Start Writing

          </button>

        </Link>

      </div>

    </div>
  );
}

export default Home;