import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TopicPage() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    fetchQuestions();

    return () => {
      stopTimer();
    };
  }, [topic]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const getSectionType = (topicName) => {
  const normalized = topicName.trim().toLowerCase();

  const quantTopics = [
    "number system",
    "simplification",
    "lcm & hcf",
    "percentages",
    "ratio & proportion",
    "profit & loss",
    "average",
    "time & work",
    "time speed distance",
    "simple & compound interest",
    "data interpretation",
  ];

  const reasoningTopics = [
    "number series",
    "coding – decoding",
    "analogy",
    "classification",
    "blood relations",
    "direction sense test",
    "seating arrangement",
    "syllogism",
    "logical puzzles",
    "statement and conclusion",
  ];

  const verbalTopics = [
    "reading comprehension",
    "synonyms",
    "antonyms",
    "sentence correction",
    "sentence rearrangement",
    "fill in the blanks",
    "error detection",
    "sentence completion",
    "vocabulary",
    "idioms and phrases",
    "one word substitution",
    "active passive voice",
    "direct indirect speech",
    "cloze test",
  ];

  if (quantTopics.includes(normalized)) return "quant";
  if (reasoningTopics.includes(normalized)) return "reasoning";
  if (verbalTopics.includes(normalized)) return "verbal";

  return "unknown";
};

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://grabit-backend-iz6n.onrender.com/api/questions/${encodeURIComponent(topic)}`
      );

      const fetchedQuestions = res.data.questions || [];
      setQuestions(fetchedQuestions);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setTimeSpent(0);

      if (fetchedQuestions.length > 0) {
        startTimer();
      }
    } catch (error) {
      console.log("Error fetching topic questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

const handleSubmit = async () => {
  stopTimer();

  let score = 0;

  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.correct_answer) {
      score++;
    }
  });

  const total = questions.length;
  const wrongAnswers = total - score;
  const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : 0;
  const decodedTopic = decodeURIComponent(topic);
  const sectionType = getSectionType(decodedTopic);

  try {
    // ✅ USE IT HERE
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("https://grabit-backend-iz6n.onrender.com/api/results/save", {
      user_id: user?.id || null,
      test_type: "topic",
      section_type: sectionType,
      topic_name: decodedTopic,
      total_questions: total,
      score,
      wrong_answers: wrongAnswers,
      percentage,
      time_taken_seconds: timeSpent,
    });
  } catch (error) {
    console.log("Failed to save result:", error);
  }

  navigate("/result", {
    state: {
      questions,
      selectedAnswers,
      score,
      total,
      testType: "topic",
      topicName: decodedTopic,
      timeSpent,
    },
  });
};
  if (loading) {
    return <h2 className="text-xl font-semibold">Loading questions...</h2>;
  }

  if (questions.length === 0) {
    return <h2 className="text-xl font-semibold">No questions found</h2>;
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {decodeURIComponent(topic)}
            </h1>
            <p className="text-sm text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
            Time: {formatTime(timeSpent)}
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-5">
          {currentQuestion.question_text}
        </h2>

        <div className="space-y-3">
          {["option_a", "option_b", "option_c", "option_d"].map((key) => {
            const optionValue = currentQuestion[key];
            const isSelected = selectedAnswers[currentIndex] === optionValue;

            return (
              <button
                key={key}
                onClick={() => handleOptionClick(optionValue)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                  isSelected
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {optionValue}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-5 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-green-600 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopicPage;