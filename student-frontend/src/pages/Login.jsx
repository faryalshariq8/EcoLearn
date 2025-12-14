import { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginStudent() {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.detail);

      localStorage.setItem("token", data.access_token);
      navigate("/courses");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <div>
      <h2>Student Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={loginStudent}>Login</button>
    </div>
  );
}

export default Login;