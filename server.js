import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_port = 4000;
const API_URL = `http://localhost:${API_port}`;
const home_page_ejs = "index.ejs";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page (my actions page)
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/notes`);
    console.log(response);
    res.render(home_page_ejs, { notes: response.data });
  } catch (error) {
    res.json({ message: "Error fetching your notes" });
  }
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
