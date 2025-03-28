import mongoose from 'mongoose';

const candidateSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: [String]
});

export default mongoose.model("Candidate", candidateSchema);
