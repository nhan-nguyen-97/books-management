import axios from "axios";

import { baseURL } from "./baseUrl";

axios.defaults.baseURL = baseURL;

export const loadAuthorsApi = async () => await axios.get("/authors");

export const createAuthorApi = async (author) => await axios.post("/authors", author);

export const updateAuthorApi = async (authorId, authorInfo) =>
  await axios.put(`/authors/${authorId}`, authorInfo);

export const deleteAuthorApi = async (authorId) =>
  await axios.delete(`/authors/${authorId}`);
