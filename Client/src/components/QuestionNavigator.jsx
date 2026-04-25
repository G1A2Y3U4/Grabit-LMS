import { motion } from "framer-motion";

function QuestionNavigator({
  questions = [],
  current = 0,
  setCurrent,
  answers = {},
  visited = {},
  marked = {}
}) {
  const renderSection = (start, end, title) => {
    const sectionQuestions = questions.slice(start, end);

    return (
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">
          {title}
        </h3>

        <div className="grid grid-cols-5 gap-2">
          {sectionQuestions.map((q, index) => {
            const actualIndex = start + index;

            let color =
              "bg-white text-black border border-gray-300";

            if (current === actualIndex) {
              color = "bg-blue-500 text-white";
            } else if (marked?.[q.id]) {
              color = "bg-yellow-400 text-black";
            } else if (answers?.[q.id]) {
              color = "bg-green-500 text-white";
            } else if (visited?.[q.id]) {
              color = "bg-gray-400 text-white";
            }

            return (
              <motion.button
                key={q.id}
                onClick={() => setCurrent(actualIndex)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-9 h-9 text-xs rounded-md font-semibold ${color}`}
              >
                {actualIndex + 1}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full">
      <h2 className="text-sm font-bold mb-3">Questions</h2>

      {renderSection(0, 20, "Quantitative")}
      {renderSection(20, 40, "Reasoning")}
      {renderSection(40, 60, "Verbal")}

      {/* Legend */}
      <div className="mt-4 text-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded"></span> Current
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded"></span> Answered
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded"></span> Marked
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-gray-400 rounded"></span> Visited
        </div>
      </div>
    </div>
  );
}

export default QuestionNavigator;