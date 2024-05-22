import { getUsers, getUserById, getUserByEmail, signup, signin, getLoggedUser, deleteUserById, updateUserById } from "../controllers/user.js";
import express from "express";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get(getUsers);

router.route("/email/:email")
  .get(getUserByEmail) 

router.route("/:_id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);
  
// User registration
router.route("/register")
  .post(signup);

// User login
router.route("/login")
  .post(signin);

// LoggedIn User
router.route("/profile/me")
  .get(verifyToken, getLoggedUser);

export default router;