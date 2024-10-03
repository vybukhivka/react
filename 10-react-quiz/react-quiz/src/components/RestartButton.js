function RestartButton({ dispatch, numQuestions, index }) {
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
