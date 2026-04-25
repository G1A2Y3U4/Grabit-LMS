import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
 {name:"Quantitative Aptitude", path:"quant"},
 {name:"Logical Reasoning", path:"reasoning"},
 {name:"Verbal Ability", path:"verbal"}
];

function Aptitude(){

 const navigate = useNavigate();

 return(

  <div className="max-w-6xl mx-auto p-10">

   <h1 className="text-3xl font-bold mb-10">
    Aptitude Practice
   </h1>

   <div className="grid md:grid-cols-3 gap-8">

   {sections.map((sec,index)=>(
    
    <motion.div
     whileHover={{scale:1.05}}
     key={index}
     onClick={()=>navigate(`/topics/${sec.path}`)}
     className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8 rounded-2xl shadow-xl cursor-pointer"
    >

     <h2 className="text-xl font-semibold">
      {sec.name}
     </h2>

    </motion.div>

   ))}

   </div>

  </div>

 )

}

export default Aptitude