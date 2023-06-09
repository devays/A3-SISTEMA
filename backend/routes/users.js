import express from "express";
import { addUser, deleteUser, getUsers, updateUser, checkEmail, searchUsers } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

router.post("/login", checkEmail);

router.get("/search", searchUsers);

export default router