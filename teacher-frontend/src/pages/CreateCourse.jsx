import React, { useState } from "react";
import BackButton from "../components/BackButton";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function submitCourse() {
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/courses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: title,
        description: desc,
        teacher_id: 2, // YOUR teacher user ID
      }),
    });

    if (!res.ok) {
      alert("Error creating course");
      return;
    }

    alert("Course created!");
  }

  return (
    <div>
      <h2>Create New Course</h2>

      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Course Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button onClick={submitCourse}>Save Course</button>
      <BackButton />
    </div>
  );
}

export default CreateCourse;
