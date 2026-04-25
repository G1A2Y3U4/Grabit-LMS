function QuestionLegend() {

  return (

    <div className="flex gap-6 text-sm mt-6">

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-blue-500 rounded"></span>
        Current
      </div>

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-green-500 rounded"></span>
        Answered
      </div>

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-gray-300 rounded"></span>
        Not Visited
      </div>

    </div>

  );

}

export default QuestionLegend;