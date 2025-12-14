import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <Link to="/create-course">Create Course</Link><br />
      <Link to="/create-quiz">Create Quiz</Link>
    </div>
  );
}

export default TeacherDashboard;
