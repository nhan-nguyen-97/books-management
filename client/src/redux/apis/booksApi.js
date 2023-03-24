import axios from "axios";

import { baseURL } from "./baseUrl";

axios.defaults.baseURL = baseURL;

export const loadBooksApi = async () => await axios.get("/books");

export const createBookApi = async (book) => await axios.post("/books", book);

export const updateBookApi = async (bookId, bookInfo) =>
  await axios.put(`/books/${bookId}`, bookInfo);

export const deleteBookApi = async (bookId) =>
  await axios.delete(`/books/${bookId}`);
