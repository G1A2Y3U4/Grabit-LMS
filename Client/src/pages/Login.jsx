import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data.success) {
        // Save logged-in user in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Go to dashboard
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Invalid Email or Password");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Invalid Email or Password");
      } else {
        alert("Server not connected");
      }
      console.log("Login error:", err);
    }
  };

  return (
    <div className="h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-1/2 flex items-center justify-center bg-white"
      >
        <div className="w-[380px]">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Welcome to Grabit
          </h1>

          <p className="text-gray-500 mb-6">
            Prepare for placements with confidence
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            New user?{" "}
            <Link to="/signup" className="text-blue-600 underline ml-1">
              Sign up to create account
            </Link>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white p-10"
      >
        <h2 className="text-4xl font-bold mb-6 text-center">
          Crack Your Placement Tests
        </h2>

        <p className="text-lg text-center mb-8 max-w-md">
          Practice Quantitative Aptitude, Logical Reasoning and Verbal Ability
          with structured tests and detailed solutions.
        </p>

        <motion.img
          src="https://illustrations.popsy.co/gray/student-graduation.svg"
          alt="placement preparation"
          className="w-[400px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      </motion.div>
    </div>
  );
}

export default Login;