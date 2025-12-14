import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateCourse from './pages/CreateCourse';
import CreateQuiz from './pages/CreateQuiz';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header>🌿 EcoLearn Environmental LMS</header>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
