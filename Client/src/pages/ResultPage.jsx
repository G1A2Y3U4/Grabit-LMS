import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state;

  // Handle no data case
  if (!resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">No Result Found</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    questions = [],
    selectedAnswers = {},
    score = 0,
    total = 0,
    testType = "",
    topicName = "",
    timeSpent = 0,
  } = resultData;

  const wrongAnswers = total - score;
  const percentage = total ? ((score / total) * 100).toFixed(2) : 0;

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins ? `${mins} min ${secs} sec` : `${secs} sec`;
  };

  // Greeting Logic
  const getGreeting = () => {
    if (score === total && total > 0) {
      return {
        title: "Perfect Score! Outstanding!",
        message: "You nailed it! Keep up the excellent performance.",
        icon: "🏆",
        gradient: "from-yellow-400 to-orange-500",
      };
    }

    if (score === 9 || score === 8) {
      return {
        title: "Great Job!",
        message: "Strong performance. You're doing really well!",
        icon: "🎉",
        gradient: "from-green-400 to-blue-500",
      };
    }

    return {
      title: "Keep Improving",
      message: "Practice more and you'll see great results.",
      icon: "📘",
      gradient: "from-red-400 to-pink-500",
    };
  };

  const greeting = getGreeting();

  // Retry Handler
  const handleRetry = () => {
    if (testType === "topic") {
      navigate(`/topic/${encodeURIComponent(topicName)}`);
    } else {
      navigate("/mock-test/start");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Greeting Section */}
        <div
          className={`bg-gradient-to-r ${greeting.gradient} text-white p-8 rounded-2xl shadow-lg text-center`}
        >
          <div className="text-5xl mb-3">{greeting.icon}</div>
          <h1 className="text-3xl font-bold">{greeting.title}</h1>
          <p className="text-lg mt-2">{greeting.message}</p>
        </div>

        {/* Summary Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Test Summary
          </h2>

          <div className="text-center space-y-2 mb-6">
            <p><strong>Test Type:</strong> {testType}</p>
            <p><strong>Topic:</strong> {topicName}</p>
            <p><strong>Time Taken:</strong> {formatTime(timeSpent)}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-8">
            <StatCard label="Total" value={total} color="blue" />
            <StatCard label="Correct" value={score} color="green" />
            <StatCard label="Wrong" value={wrongAnswers} color="red" />
            <StatCard label="Score" value={`${percentage}%`} color="yellow" />
          </div>

          {/* Questions Review */}
          <div className="space-y-4">
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === q.correct_answer;

              return (
                <div
                  key={q.id || index}
                  className={`p-4 rounded-xl border ${
                    isCorrect
                      ? "bg-green-50 border-green-400"
                      : "bg-red-50 border-red-400"
                  }`}
                >
                  <h3 className="font-semibold mb-2">
                    Q{index + 1}. {q.question_text}
                  </h3>

                  <p>
                    <strong>Your Answer:</strong>{" "}
                    {userAnswer || "Not Answered"}
                  </p>

                  <p>
                    <strong>Correct Answer:</strong> {q.correct_answer}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Go Home
            </button>

            <button
              onClick={handleRetry}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Retry Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className={`p-4 rounded-xl ${colorMap[color]}`}>
      <p className="text-sm">{label}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

export default ResultPage;