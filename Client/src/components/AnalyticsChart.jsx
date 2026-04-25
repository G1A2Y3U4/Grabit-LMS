import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

function AnalyticsChart({ results = [] }) {
  const chartData = results
    .slice(0, 10)
    .reverse()
    .map((item, index) => ({
      test: `Test ${index + 1}`,
      marks: Number(item.score) || 0,
    }));

  if (chartData.length === 0) {
    return <p className="text-gray-500">No analytics available yet.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg p-6 rounded-xl"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="test" />
          <YAxis domain={[0, 10]} />
          <Tooltip formatter={(value) => [`${value} marks`, "Score"]} />

          <Line
            type="monotone"
            dataKey="marks"
            stroke="url(#colorMarks)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default AnalyticsChart;