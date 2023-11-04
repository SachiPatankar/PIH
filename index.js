import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let categories = ["Unstarted","In-progress","Completed"]
let projects = ["myproj1", "myproj2"]
let people = ["you", "person2"]

let notes = [
  {
    id: 1,
    project: projects[0],
    title: "Note A",
    content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    person: people[0],
    category : categories[0],
  },
  {
    id: 2,
    project: projects[1],
    title: "Note B",
    content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    person: people[1],
    category : categories[1],
  },
  
];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all your notes
app.get("/notes", (req,res)=>{
  let myNotes = notes.filter((note) => note.person === "you"); 
  res.json(myNotes);
});

// GET a specific notes by project
app.get("/notes/:project", (req,res)=>{
  const thisProject = req.params.project;
  let projectNotes = notes.filter((note) => note.project === thisProject); 
  res.send(projectNotes);
})

// GET note by ID
app.get("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

// POST a new note
app.post("/notes", (req, res) => {
  const newId = notes.length += 1;
  const note = {
    id: newId,
    project: req.body.project,
    title: req.body.title,
    content: req.body.content,
    person: req.body.person,
  };
  notes.push(note);
  res.status(201).json(notes[notes.length - 1]);
});

//PATCH a post when you just want to update one parameter
app.patch("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const note = notes.find((n) => n.id === id);
  if (!note){
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
  res.json(note);
});

//DELETE a specific post by providing the note id.
app.delete("/notes/:id", (req, res) => {

  const index = notes.findIndex((n) => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }
  notes.splice(index, 1);
  res.json({ message: "Note deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
