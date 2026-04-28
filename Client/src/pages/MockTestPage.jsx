import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import Timer from "../components/Timer";
import QuestionNavigator from "../components/QuestionNavigator";

function MockTestPage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [marked, setMarked] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && questions[current]) {
      setVisited((prev) => ({
        ...prev,
        [questions[current].id]: true,
      }));
    }
  }, [current, questions]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://grabit-backend-iz6n.onrender.com/api/questions/mock/test"
      );
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load questions");
    }
  };

  const handleSelect = (option) => {
    const question = questions[current];

    setAnswers((prev) => ({
      ...prev,
      [question.id]: option,
    }));
  };

  const handleMarkForReview = () => {
    const question = questions[current];

    setMarked((prev) => ({
      ...prev,
      [question.id]: !prev[question.id],
    }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        score++;
      }
    });

    navigate("/result", {
      state: {
        questions,
        selectedAnswers: answers,
        score,
        total: questions.length,
        testType: "mock",
        topicName: "Mock Test",
      },
    });
  };

  if (questions.length === 0) {
    return <h2 className="text-center mt-10">Loading Questions...</h2>;
  }

  const question = questions[current];
  const isLastQuestion = current === questions.length - 1;

  const getSectionTitle = () => {
    if (current < 20) return "Quantitative Aptitude";
    if (current < 40) return "Logical Reasoning";
    return "Verbal Ability";
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Mock Test</h1>
            <p className="text-gray-500 mt-1">
              {getSectionTitle()} | Question {current + 1} of {questions.length}
            </p>
          </div>

          <Timer duration={3600} onTimeUp={handleSubmit} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
          {/* Left side - Question */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-lg rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-5">
              Q{current + 1}. {question.question_text}
            </h2>

            <div className="space-y-3">
              {["option_a", "option_b", "option_c", "option_d"].map((key, index) => (
                <label
                  key={index}
                  className={`block cursor-pointer rounded-xl border px-4 py-3 transition ${
                    answers?.[question.id] === question[key]
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    className="mr-3"
                    checked={answers?.[question.id] === question[key]}
                    onChange={() => handleSelect(question[key])}
                  />
                  {question[key]}
                </label>
              ))}
            </div>

            <div className="mt-3 text-sm text-gray-500">
              {question.category_name} | {question.topic_name}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={current === 0}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={handleMarkForReview}
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
              >
                Mark for Review
              </button>

              {!isLastQuestion ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </motion.div>

          {/* Right side - Navigator */}
          <div className="sticky top-6">
            <QuestionNavigator
              questions={questions}
              current={current}
              setCurrent={setCurrent}
              answers={answers}
              visited={visited}
              marked={marked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockTestPage;