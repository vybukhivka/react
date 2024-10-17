import { useQuiz } from "../context/QuizContext"

function RestartButton() {
	const { dispatch, numQuestions, index } = useQuiz()

  if (index < numQuestions - 1 || index === numQuestions - 1) return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "restart" })}
    >
      Restart
    </button>
  )
}

export default RestartButton
