import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AnalyticsChart from "../components/AnalyticsChart";

function Dashboard({ open }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.id) {
        console.log("User not found in localStorage");
        setResults([]);
        return;
      }

      const res = await axios.get(
        `https://grabit-backend-iz6n.onrender.com/api/results/all/${user.id}`
      );

      setResults(res.data.results || []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const latestResult = results[0] || null;

  const fastestTopic = results.reduce((fastest, current) => {
    return current.time_taken_seconds < (fastest?.time_taken_seconds ?? Infinity)
      ? current
      : fastest;
  }, null);

  const slowestTopic = results.reduce((slowest, current) => {
    return current.time_taken_seconds > (slowest?.time_taken_seconds ?? 0)
      ? current
      : slowest;
  }, null);

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined) return "-";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds} sec`;
    }

    return `${minutes} min ${remainingSeconds} sec`;
  };

  return (
    <div
      className={`min-h-screen p-10 bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-300 ${
        open ? "ml-64" : "ml-0"
      }`}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-3xl font-bold text-gray-800"
      >
        Dashboard
      </motion.h1>

      {loading ? (
        <div className="rounded-xl bg-white p-6 shadow-lg text-gray-600">
          Loading dashboard...
        </div>
      ) : (
        <>
          {/* Recently Finished Topic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="mb-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white shadow-lg"
          >
            <h2 className="text-lg font-semibold">Recently Finished Topic</h2>
            <p className="mt-2 text-xl font-bold">
              {latestResult ? latestResult.topic_name : "No topic completed yet"}
            </p>
            <p className="mt-1 text-sm capitalize">
              Type: {latestResult?.section_type || "-"}
            </p>
          </motion.div>

          {/* Completed Topics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 rounded-xl bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 text-lg font-semibold text-blue-600">
              Completed Topics
            </h2>

            <div className="mb-2 grid grid-cols-4 border-b pb-2 font-semibold text-gray-800">
              <span>Type</span>
              <span>Topic</span>
              <span>Status</span>
              <span>Time</span>
            </div>

            {results.length > 0 ? (
              results.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 rounded py-2 transition hover:bg-gray-50"
                >
                  <span className="capitalize">{item.section_type || "-"}</span>
                  <span>{item.topic_name}</span>
                  <span className="font-semibold text-green-500">Completed</span>
                  <span>{formatTime(item.time_taken_seconds)}</span>
                </div>
              ))
            ) : (
              <p className="mt-4 text-gray-500">No completed topics yet.</p>
            )}
          </motion.div>

          {/* Performance Section */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl bg-gradient-to-r from-green-400 to-teal-500 p-6 text-white shadow-lg"
            >
              <h3 className="mb-2 font-bold">Fastest Topic</h3>
              <p>{fastestTopic ? fastestTopic.topic_name : "No data available"}</p>
              <p className="mt-1 text-sm capitalize">
                {fastestTopic?.section_type || "-"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl bg-gradient-to-r from-red-400 to-pink-500 p-6 text-white shadow-lg"
            >
              <h3 className="mb-2 font-bold">Slowest Topic</h3>
              <p>{slowestTopic ? slowestTopic.topic_name : "No data available"}</p>
              <p className="mt-1 text-sm capitalize">
                {slowestTopic?.section_type || "-"}
              </p>
            </motion.div>
          </div>

          {/* Analytics Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 text-lg font-semibold">Performance Analytics</h2>
            <AnalyticsChart results={results} />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Dashboard;