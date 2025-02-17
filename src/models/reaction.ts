import { Schema, Types, Document } from "mongoose";
import moment from "moment";

export interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// ✅ Define the Reaction Schema
const ReactionSchema = new Schema<IReaction>(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { 
      getters: true,
      transform: function (_, ret) {
        if (ret.createdAt) {
        ret.createdAt = moment(ret.createdAt).toISOString();
      }
      return ret;
    }
    },
    id: false,
  }
);

// ✅ Export the Reaction Schema (NOT a model)
export default ReactionSchema;
