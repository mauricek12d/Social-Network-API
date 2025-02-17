import { Request, Response } from "express";
import Thought from "../models/thought";
import User from "../models/user"; 

// ✅ GET all thoughts
export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error("❌ Error fetching thoughts:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  };

// ✅ GET a single thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ POST (Create) a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🟢 Incoming request to create thought:", req.body); // ✅ Logs request data

    const { thoughtText, username, userId } = req.body;

    // ✅ Check if all fields are provided
    if (!thoughtText || !username || !userId) {
      console.log("❌ Missing fields:", { thoughtText, username, userId }); // ✅ Logs missing fields
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // ✅ Verify that the user exists in MongoDB before adding a thought
    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ User not found for ID:", userId); // ✅ Logs if user is missing
      res.status(404).json({ message: "User not found. Cannot add Thought." });
      return;
    }

    // ✅ Create the Thought
    const newThought = await Thought.create({ thoughtText, username });

    console.log("✅ Thought created:", newThought); // ✅ Logs the newly created thought

    // ✅ Push the Thought _id to the User's `thoughts` array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true, runValidators: true }
    );

    console.log("✅ Updated User:", updatedUser); // ✅ Logs the updated user document

    res.status(201).json(newThought);
  } catch (err) {
    console.error("❌ Error creating thought:", err); // ✅ Now logs errors in the terminal
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ✅ PUT (Update) a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ DELETE a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    
    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    // Remove the thought ID from the associated user's thoughts array
    await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } }
    );

    res.json({ message: "Thought deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ POST (Create) a reaction for a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ DELETE a reaction by ID
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
