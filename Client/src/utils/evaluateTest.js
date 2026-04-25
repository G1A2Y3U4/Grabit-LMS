export function evaluateTest(questions, answers) {

  let correct = 0;

  const result = questions.map((q, i) => {

    const isCorrect = q.correctAnswer === answers[i];

    if (isCorrect) correct++;

    return {
      ...q,
      selected: answers[i],
      correct: isCorrect
    };
  });

  return {
    score: correct,
    total: questions.length,
    result
  };
}