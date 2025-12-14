import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const userId = 2; // Later dynamic

  useEffect(() => {
    fetch(`${API_URL}/enrollments/student/${userId}`)
      .then(res => res.json())
      .then(setCourses);
  }, []);

  return (
    <div>
      <h2>Your Enrolled Courses</h2>
      {courses.map(e => (
        <div key={e.id}>
          <h4>Course ID: {e.course_id}</h4>
          <Link to={`/lessons/${e.course_id}`}>View lessons</Link><br />
          <Link to={`/quiz/${e.course_id}`}>Take quiz</Link>
        </div>
      ))}
    </div>
  );
}

export default EnrolledCourses;
