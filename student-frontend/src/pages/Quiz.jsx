import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";

function Quiz() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [selected, setSelected] = useState({});
  const userId = 2; // Later dynamic

  useEffect(() => {
    fetch(`${API_URL}/quizzes/course/${courseId}`)
      .then(res => res.json())
      .then(setQuizzes);
  }, []);

async function submitQuiz() {
  const answers = Object.keys(selected).map(questionId => ({
    question_id: Number(questionId),
    selected_option: selected[questionId]
  }));

  try {
    const res = await fetch(`${API_URL}/quizzes/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        course_id: courseId,
        answers
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return alert(data.detail || "Something went wrong.");
    }

    alert("Quiz graded!\nScore: " + data.score);
  } catch (err) {
    console.error(err);
    alert("Submission error");
  }
}

  return (
    <div>
      <h2>Quiz</h2>
      {quizzes.map(q => (
        <div key={q.id}>
          <p>{q.question}</p>
          {[q.option_a, q.option_b, q.option_c, q.option_d].map(o => (
            <label key={o}>
              <input
                type="radio"
                name={q.id}
                value={o}
                onChange={() => setSelected({ ...selected, [q.id]: o })}
              />
              {o}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submitQuiz}>Submit</button>
   </div>
  );
}

export default Quiz;
