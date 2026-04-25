export function getRandomQuestions(allQuestions,count){

 const shuffled = [...allQuestions].sort(()=>0.5-Math.random());

 return shuffled.slice(0,count);

}