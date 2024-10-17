function FinishScreen({ points, numPoints, highscore }) {
  const percentage = (points / numPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {numPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishScreen;
