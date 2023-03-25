import express from "express";

import { getUsers, createUser, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);

router.post("/users", createUser);

router.post("/users/update", updateUser);

router.delete("/users/delete", deleteUser)

export default router;
