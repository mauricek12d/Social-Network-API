import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/user";

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
      }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).populate("thoughts").populate("friends");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, friendId } = req.params;
  
      // ✅ Check if IDs are valid before querying MongoDB
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
        res.status(400).json({ message: "Invalid userId or friendId format" });
        return;
      }
  
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
  
      if (!user) {
        console.log(`❌ User with ID ${userId} not found.`);
        res.status(404).json({ message: `User with ID ${userId} not found.` });
        return;
      }
  
      if (!friend) {
        console.log(`❌ Friend with ID ${friendId} not found.`);
        res.status(404).json({ message: `Friend with ID ${friendId} not found.` });
        return;
      }
  
      if (user.friends.includes(friendId as unknown as Types.ObjectId)) {
        res.status(400).json({ message: "They are already friends!" });
        return;
      }
  
      user.friends.push(new Types.ObjectId(friendId));
      await user.save();
  
      res.status(200).json({ message: "Friend added successfully!", user });
    } catch (err) {
      console.error("❌ Error adding friend:", err);
      res.status(500).json({ message: "Server Error", error: err });
    }
  };

  export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, friendId } = req.params;

      const userObjectId = new Types.ObjectId(userId);
      const friendObjectId = new Types.ObjectId(friendId);

      const user = await User.findById(userObjectId);

      if (!user) {
        res.status(404).json({ message: "User or friend not found" });
        return;
      }

      user.friends = user.friends.filter(id => id.toString() !== friendObjectId.toString());
      await user.save();
      
      res.status(200).json({message: "Friend removed successfully!", user});
    } catch (err) {
      console.error("Error removing friend:", err);
      res.status(500).json({ message: "Server Error", error: err });
    }
  };
  
  export const updateUser = async (req: Request, res: Response): Promise<void> => {
      try {
        const { id } = req.params;
    
        const updatedUser = await User.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true } // ✅ Returns the updated user & runs validators
        );
    
        if (!updatedUser) {
          res.status(404).json({ message: "User not found." });
          return;
        }
    
        res.status(200).json(updatedUser);
      } catch (err) {
        console.error("❌ Error updating user:", err);
        res.status(500).json({ message: "Server Error", error: err });
      }
    };

      export const deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
      
          // ✅ Validate if `id` is a valid ObjectId before querying MongoDB
          if (!Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
          }
      
          const deletedUser = await User.findByIdAndDelete(id);
      
          if (!deletedUser) {
            console.log(`❌ User with ID ${id} not found.`);
            res.status(404).json({ message: `User with ID ${id} not found.` });
            return;
          }
      
          res.status(200).json({ message: "User deleted successfully!" });
        } catch (err) {
          console.error("❌ Error deleting user:", err);
          res.status(500).json({ message: "Server Error", error: err });
        }
      };
