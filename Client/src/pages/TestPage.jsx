import { useEffect } from "react";

function TestPage() {
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then(res => res.json())
      .then(data => console.log("DATA:", data))
      .catch(err => console.error("ERROR:", err));
  }, []);

  return <h1>Test Page</h1>;
}

export default TestPage;