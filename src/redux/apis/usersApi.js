import axios from "axios";

import { baseURL } from "./baseUrl";

axios.defaults.baseURL = baseURL;

export const loadUsersApi = async () => await axios.get("/users");

export const loadUserByIdApi = async (userId) => await axios.get(`/users/${userId}`)

export const createUserApi = async (user) => await axios.post("/users", user);

export const updateUserApi = async (userId, userInfo) =>
  await axios.put(`/users/${userId}`, userInfo);

export const deleteUserApi = async (userId) =>
  await axios.delete(`/users/${userId}`);
