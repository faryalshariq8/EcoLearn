import React, { useState } from "react";
import BackButton from "../components/BackButton";

function CreateQuiz() {
  const [question, setQuestion] = useState("");
  const [optionA, setA] = useState("");
  const [optionB, setB] = useState("");
  const [optionC, setC] = useState("");
  const [optionD, setD] = useState("");
  const [answer, setAnswer] = useState("");
  const [courseId, setCourseId] = useState("");

  async function submitQuiz() {
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/quizzes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        question,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_answer: answer,
        course_id: Number(courseId),
      }),
    });

    if (!res.ok) {
      alert("Error creating quiz");
      return;
    }
    alert("Quiz created!");
  }

  return (
    <div>
      <h2>Create Quiz Question</h2>

      <input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <input placeholder="Option A" value={optionA} onChange={(e) => setA(e.target.value)} />
      <input placeholder="Option B" value={optionB} onChange={(e) => setB(e.target.value)} />
      <input placeholder="Option C" value={optionC} onChange={(e) => setC(e.target.value)} />
      <input placeholder="Option D" value={optionD} onChange={(e) => setD(e.target.value)} />
      <input placeholder="Correct Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />

      <input
        placeholder="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />

      <button onClick={submitQuiz}>Add Question</button>
      <BackButton />
    </div>
  );
}

export default CreateQuiz;
