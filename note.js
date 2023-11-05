import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  project: String,
  title: String,
  content: String,
  person: String,
  category: String,
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
