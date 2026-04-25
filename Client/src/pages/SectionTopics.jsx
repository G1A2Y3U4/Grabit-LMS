import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const topicsData = {

  quant: [
    "Number System",
    "Simplification",
    "LCM & HCF",
    "Percentages",
    "Ratio & Proportion",
    "Profit & Loss",
    "Average",
    "Time & Work",
    "Time Speed Distance",
    "Simple & Compound Interest",
    "Data Interpretation"
  ],

  reasoning: [
    "Number Series",
    "Coding – Decoding",
    "Analogy",
    "Classification",
    "Blood Relations",
    "Direction Sense Test",
    "Seating Arrangement",
    "Syllogism",
    "Logical Puzzles",
    "Statement and Conclusion"
  ],

  verbal: [
    "Reading Comprehension",
    "Synonyms",
    "Antonyms",
    "Sentence Correction",
    "Sentence Rearrangement",
    "Fill in the Blanks",
    "Error Detection",
    "Sentence Completion",
    "Vocabulary",
    "Idioms and Phrases",
    "One Word Substitution",
    "Active Passive Voice",
    "Direct Indirect Speech",
    "Cloze Test"
  ]

};

function SectionTopics() {

  const { section } = useParams();
  const navigate = useNavigate();

  const topics = topicsData[section] || [];

  return (

    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-10 capitalize">
        {section} Topics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {topics.map((topic, index) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}

            
            onClick={() => navigate(`/topic/${encodeURIComponent(topic)}`)}

            className="bg-white shadow-xl rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition"
          >
            {topic}
          </motion.div>

        ))}

      </div>

    </div>

  );
}

export default SectionTopics;