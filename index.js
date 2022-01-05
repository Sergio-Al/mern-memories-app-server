import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import postRoutes from "./routes/posts.js"; // We need to specify the extension js

config(); // configuring env variables from dotenv

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // this goes first than routes;

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("hello to Memories API");
});

// using mongodb atlas version
const CONNECTION_URL = process.env.MONGODB_REMOTE;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // these options objects are there for handling database purposes and avoid unexpected errors
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((e) => console.log(e.message));

// mongoose.set("useFindAndModify", false); // this is deprecated no longer needed
