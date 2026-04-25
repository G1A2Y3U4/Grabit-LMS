import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MockTestIntro() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Mock Test
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Attend the test to experience the real-time exam.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 text-left mb-8 border">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Total Questions: 60</li>
            <li>• Duration: 1 Hour</li>
            <li>• Questions are mixed from Quant, Reasoning and Verbal</li>
            <li>• Each time you start, you get a new random set</li>
            <li>• Click submit before time ends</li>
          </ul>
        </div>

        <button
          onClick={() => navigate("/mock-test/start")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Test
        </button>
      </motion.div>
    </div>
  );
}

export default MockTestIntro;