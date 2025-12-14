import { useParams } from "react-router-dom";

export default function QuizResults() {
  const { score, total } = history.state || { score: 0, total: 0 };

  return (
    <div className="container">
      <h2>Your Quiz Results 🌿</h2>
      <p>You scored <strong>{score}</strong> out of <strong>{total}</strong>!</p>
    </div>
  );
}
