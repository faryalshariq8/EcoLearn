import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../api";

function Lessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/lessons/course/${courseId}`)
      .then(res => res.json())
      .then(setLessons);
  }, []);

  return (
    <div>
      <h2>Lessons</h2>
      {lessons.map(l => (
        <div key={l.id}>
          <h3>{l.title}</h3>
          <p>{l.content}</p>
        </div>
      ))}
    </div>

  );
}

export default Lessons;
