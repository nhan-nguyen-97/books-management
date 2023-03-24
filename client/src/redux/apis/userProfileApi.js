import axios from "axios";

import { baseURL } from "./baseUrl";

axios.defaults.baseURL = baseURL;

export const loadUserProfileApi = async (userId) =>
  await axios.get(`/users/${userId}`);

export const changePasswordApi = async (userId, password) =>
  await axios.patch(`/users/${userId}`, password);
