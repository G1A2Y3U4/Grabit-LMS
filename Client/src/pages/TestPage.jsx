import { useEffect } from "react";

function TestPage() {
  useEffect(() => {
    fetch("https://grabit-backend-iz6n.onrender.com/api/questions")
      .then(res => res.json())
      .then(data => console.log("DATA:", data))
      .catch(err => console.error("ERROR:", err));
  }, []);

  return <h1>Test Page</h1>;
}

export default TestPage;