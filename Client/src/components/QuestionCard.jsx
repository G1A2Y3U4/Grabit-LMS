import { motion } from "framer-motion";

function QuestionCard({ question, index, selected, setAnswer }) {

 return(

  <motion.div
   initial={{opacity:0,y:20}}
   animate={{opacity:1,y:0}}
   className="bg-white shadow-lg p-6 rounded-xl mb-6"
  >

   <h2 className="font-semibold mb-4 text-lg">
    {index + 1}. {question.questionText}
   </h2>

   <div className="space-y-3">

    {question.options.map((opt,i)=>(

     <motion.label
      whileHover={{scale:1.03}}
      key={i}
      className={`block p-3 rounded cursor-pointer border 
      ${selected===opt ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
     >

      <input
       type="radio"
       name={`q-${index}`}
       checked={selected===opt}
       onChange={()=>setAnswer(opt)}
      />

      <span className="ml-2">{opt}</span>

     </motion.label>

    ))}

   </div>

   <div className="mt-4 text-sm text-gray-500">
    Shortcut: {question.explanation}
   </div>

  </motion.div>

 )

}

export default QuestionCard