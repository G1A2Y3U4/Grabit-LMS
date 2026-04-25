import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Sidebar({ open }) {
  const linkClass =
    "px-3 py-2 rounded-lg transition font-medium";

  return (
    <motion.div
      animate={{ width: open ? 250 : 0 }}
      className="bg-gray-900 text-white h-[calc(100vh-56px)] overflow-hidden"
    >
      <nav className="flex flex-col gap-4 p-6">

        {/* DASHBOARD */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
            }`
          }
        >
          Dashboard
        </NavLink>

        {/* APTITUDE */}
        <NavLink
          to="/aptitude"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
            }`
          }
        >
          Aptitude Practice
        </NavLink>

        {/* MOCK TEST */}
        <NavLink
          to="/mock-test"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
            }`
          }
        >
          Mock Test
        </NavLink>

        {/* PROFILE */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
            }`
          }
        >
          Profile
        </NavLink>

      </nav>
    </motion.div>
  );
}

export default Sidebar;