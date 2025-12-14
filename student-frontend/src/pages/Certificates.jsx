export default function Certificate() {
  return (
    <div style={{
      background: "white",
      padding: "40px",
      maxWidth: "700px",
      margin: "40px auto",
      textAlign: "center",
      border: "4px solid #4caf50",
      borderRadius: "20px"
    }}>
      <h1 style={{ color: "#2e7d32" }}>EcoLearn Certificate 🌍</h1>
      <p>This certifies that:</p>
      <h2 style={{ margin: "20px 0", color: "#388e3c" }}>
        {localStorage.getItem("studentName")}
      </h2>
      <p>has successfully completed their environmental learning journey.</p>
      <button onClick={() => window.print()}>Print Certificate</button>
    </div>
  );
}
