const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: [String],
    status: { type: String, enum: ["Available", "Assigned"], default: "Available" },
});

module.exports = mongoose.model("Project", projectSchema);