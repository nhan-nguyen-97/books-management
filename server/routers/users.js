import express from "express";

import { getUsers, createUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);

router.post("/users", createUser);

router.post("/users/update", updateUser)

export default router;
