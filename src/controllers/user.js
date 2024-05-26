import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
}

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await argon2.hash(password, {type: argon2.argon2i});
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
}

export function getLoggedUser(req, res) {
  res.json({ user: req.user });
}

export function getUserByEmail(req, res) {
    User.findOne({ "email": req.params.email })
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(500).json({error: "User not found"});
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
}

export function getUserById(req, res) {
  User.findById(req.params._id)
  .then((doc) => {
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(500).json({ error: "User not found" });
    }
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}


export function deleteUserById(req, res) {
  User.findByIdAndDelete(req.params._id)
    .then((doc) => {
      if (doc) {
        res.status(200).json({ message: "User successfully deleted" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getUsers(req, res) {
  User.find()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function updateUserById(req, res) {
  User.findByIdAndUpdate(req.params._id, { $set: req.body} , { new: true })
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
}

export async function updatePassword(req, res) {
  try {
    const userEmail = req.params.email;
    const { oldPassword, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the old password
    const isPasswordValid = await argon2.verify(user.password, oldPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // Hash the new password
    const hashedNewPassword = await argon2.hash(newPassword, { type: argon2.argon2i });

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password', error: err.message });
  }
}
