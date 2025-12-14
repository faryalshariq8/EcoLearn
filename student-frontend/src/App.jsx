import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import EnrolledCourses from "./pages/EnrolledCourses";
import Lessons from "./pages/Lessons";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import Progress from "./pages/Progress";

function App() {
  return (
      <BrowserRouter>
        <header>🌿 EcoLearn Environmental LMS</header>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrolled" element={<EnrolledCourses />} />
        <Route path="/lessons/:courseId" element={<Lessons />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />
        <Route path="/results/:userId" element={<QuizResults />} />
        <Route path="/progress/:userId" element={<Progress />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
