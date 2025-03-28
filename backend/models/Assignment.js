import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  progress: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  status: { type: String, enum: ["Pending", "Accepted", "Denied"], default: "Pending" },
  acceptanceStatus: { 
    type: String, 
    enum: ["Pending", "Accepted", "Denied"], 
    default: "Pending" 
  },
});

export default mongoose.model("Assignment", assignmentSchema);