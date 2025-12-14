import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then(res => res.json())
      .then(setCourses);
  }, []);

  async function enroll(courseId) {
    const userId = 1; // You will set dynamically later

    await fetch(`${API_URL}/enrollments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, course_id: courseId })
    });

    alert("Enrolled!");
  }

  return (
    <div>
      <h2>All Courses</h2>

      {courses.map(c => (
        <div key={c.id}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>

          <button onClick={() => enroll(c.id)}>Enroll</button>

          <Link to={`/lessons/${c.id}`}>View lessons</Link>
          <br />
          <Link to={`/quiz/${c.id}`}>Take Quiz</Link>
        </div>
      ))}
    </div>
  );
}

export default Courses;
