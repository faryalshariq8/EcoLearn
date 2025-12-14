import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Progress() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    async function loadProgress() {
      const res = await fetch(`${API_URL}/students/me/progress`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      setProgress(data);
    }

    loadProgress();
  }, []);

  if (!progress) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <BackButton />

      <h2>Your Progress</h2>

      <div
        style={{
          background: "#e8f5e9",
          padding: "20px",
          borderRadius: "10px",
          width: "60%",
          margin: "20px auto"
        }}
      >
        <p><strong>Total Quizzes Taken:</strong> {progress.quizzes_taken}</p>
        <p><strong>Average Score:</strong> {progress.average_score}%</p>
        <p><strong>Green Skill Level:</strong> {progress.level}</p>

        {progress.certified ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            ✅ Certificate Earned!
          </p>
        ) : (
          <p style={{ color: "red" }}>
            ❌ No certificate yet — keep learning!
          </p>
        )}
      </div>
    </div>
  );
}
