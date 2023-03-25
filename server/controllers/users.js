import { UsersModel } from "../models/UsersModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UsersModel.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    const user = new UsersModel(newUser);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = req.body;
    const user = await UsersModel.findOneAndUpdate(
      { _id: updateUser._id },
      updateUser,
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const newUser = req.body;

    const user = new UsersModel(newUser);
    await user.deleteOne({_id: `${newUser._id}`});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};