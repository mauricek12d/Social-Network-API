import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from "../controllers/userControllers";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", removeFriend);

export default router;
