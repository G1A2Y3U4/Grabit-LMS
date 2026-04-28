import axios from "axios";

const API = axios.create({
  baseURL: "https://grabit-backend-iz6n.onrender.com/api"
});

export const getQuestions = (topic) =>
  API.get(`/questions/${topic}`);

export const submitTest = (data) =>
  API.post("/submit-test", data);

export default API;