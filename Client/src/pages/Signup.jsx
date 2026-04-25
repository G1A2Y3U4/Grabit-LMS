import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data.success) {
        alert("Account created successfully!");
        navigate("/");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Signup failed");
      } else {
        alert("Server not connected");
      }
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 flex items-center justify-center bg-white"
      >
        <div className="w-[380px]">
          <h1 className="text-3xl font-bold mb-6">Create Account</h1>

          <form onSubmit={handleSignup}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Full Name"
              required
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Email"
              required
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Confirm Password"
                required
              />
              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </motion.button>
          </form>

          <p className="text-gray-500 mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 underline">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 bg-blue-400 flex items-center justify-center"
      >
        <motion.img
          src="https://illustrations.popsy.co/gray/student-graduation.svg"
          className="w-[600px]"
          alt="signup illustration"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      </motion.div>
    </div>
  );
}

export default Signup;