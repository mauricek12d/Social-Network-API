import { Schema, model, Document, Types } from "mongoose";
import moment from "moment";
import ReactionSchema, { IReaction } from "./reaction"; 

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Using imported `ReactionSchema`
const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now},
    username: { type: String, required: true },   
    reactions: [ReactionSchema],
  },
  {
    toJSON: { 
      virtuals: true, 
      getters: true,
      transform: function (_, ret) {
        if (ret.createdAt) {
        ret.createdAt = moment(ret.createdAt).toISOString();
        }

        if (ret.reactions && Array.isArray(ret.reactions)) {
        ret.reactions = ret.reactions.map((reaction: any) => ({
          ...reaction,
          createdAt: reaction.createdAt ? moment(reaction.createdAt).toISOString() : "",
        }));
      }
      
      return ret;
    }
    },
    id: false,
  }
);

// ✅ Virtual property for reaction count
ThoughtSchema.virtual("reactionCount").get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", ThoughtSchema);
export default Thought;
