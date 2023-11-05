import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_port = 4000;
const API_URL = `http://localhost:${API_port}`;
const main_page_ejs = "index.ejs";
const project_page_ejs = "project.ejs";
const note_ejs = "makenote.ejs"

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page (my actions page)
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/notes`);
    // console.log(response);
    res.render(main_page_ejs, { notes: response.data });
  } catch (error) {
    res.json({ message: "Error fetching your notes" });
  }
});

// Route to render the any specific project page
app.get("/:project", async (req,res) =>{
  try {
    const response = await axios.get(`${API_URL}/notes/${req.params.project}`);
    // console.log(response);
    res.render(project_page_ejs, { notes: response.data });
  } catch (error) {
    res.json({ message: "Error fetching your notes" });
  }

});

// Route to note making page for new note
app.get("/new", (req, res) => {
  res.render(note_ejs, { heading: "New Note", submit: "Create Note" });
});

//Route to note making page for editing a note
app.get("/edit/:id", async (req, res) => {
  try {

    const response = await axios.post(`${API_URL}/notes/${req.params.id}`);
    // console.log(response.data);
    res.render(note_ejs, {
      heading: "Edit Post",
      submit: "Update Post",
      note: response.data,
    });
  } catch (error) {
    res.status(500).json({ 
    message: error.message });
  }
});


// Route to POST new note
app.post("/newnote", async(req,res) =>{
  try{
  const response = await axios.post(`${API_URL}/notes`, req.body);
  // console.log(response.data);
  res.redirect("/");
  } catch(error){
    res.status(500).json({message:"Error posting note"});
  }
});

// Route to PATCH an existing note
app.post("/editnote/:id", async(req,res) =>{
  try{
    // console.log(req.params.id);
    const response = await axios.patch(`${API_URL}/notes/${req.params.id}`, req.body);
    // console.log(response.data);
    res.redirect("/");
  }catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
});

// Route to DELETE note
app.get("/deletenote/:id", async(req,res) =>{
  try {
    await axios.delete(`${API_URL}/notes/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  } 
});






app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
