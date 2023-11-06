import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
import Note from "./note.js"; 

import Connection from './db.js';

Connection();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all  notes
app.get("/notes", async (req, res) => {
  try {
    const myNotes = await Note.find({ person: "Sarah Johnson" });
    res.json(myNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a specific notes by project
app.get("/notes/:project", async (req, res) => {
  try {
    const thisProject = req.params.project;
    const projectNotes = await Note.find({ project: thisProject });
    res.json(projectNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET note by ID
app.post("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new note
app.post("/notes", async (req, res) => {
  try {
   
    const newNote = new Note({
      project: req.body.project,
      title: req.body.title,
      content: req.body.content,
      person: req.body.person,
      category: req.body.category, 
    });

    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//PATCH a post when you just want to update one parameter
app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (req.body.project) {
      note.project = req.body.project;
    }
    if (req.body.title) {
      note.title = req.body.title;
    }
    if (req.body.content) {
      note.content = req.body.content;
    }
    if (req.body.person) {
      note.person = req.body.person;
    }
    if (req.body.category) {
      note.category = req.body.category;
    }

    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//DELETE a specific post by providing the note id.
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
