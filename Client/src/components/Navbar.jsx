import { Menu } from "lucide-react";
import { motion } from "framer-motion";

function Navbar({ toggleSidebar }) {

  return (

    <div className="bg-white shadow px-6 py-3 flex items-center">

      <button onClick={toggleSidebar} className="text-2xl">
        ☰
      </button>

      <h1 className="ml-4 font-bold text-xl">
        Grabit
      </h1>

    </div>
  );
}

export default Navbar;