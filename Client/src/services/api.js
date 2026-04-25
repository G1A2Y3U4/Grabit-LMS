import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getQuestions = (topic) =>
  API.get(`/questions/${topic}`);

export const submitTest = (data) =>
  API.post("/submit-test", data);

export default API;