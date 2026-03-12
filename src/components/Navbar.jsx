import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h2 className="font-semibold text-lg">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <div className="text-gray-600">
          Welcome
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;