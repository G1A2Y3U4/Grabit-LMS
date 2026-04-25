function TestProgress({ answers, total }) {

  const answeredCount = Object.keys(answers).length;

  const percentage = (answeredCount / total) * 100;

  return (

    <div className="mb-6">

      <div className="flex justify-between mb-2 text-sm">

        <span>Answered: {answeredCount} / {total}</span>

        <span>{Math.round(percentage)}%</span>

      </div>

      <div className="w-full bg-gray-200 rounded h-3">

        <div
          className="bg-green-500 h-3 rounded transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

    </div>

  );

}

export default TestProgress;