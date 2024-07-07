const express = require("express");
const db = require("./db/db");
const cors = require("cors");

const app = express();
const port = 8000;

db();
app.use(cors());
app.use(express.json());
app.use("/v1/data", require("./routes/data"));
app.use("/v1/filter", require("./routes/filter"));

app.listen(port, ()=>{
    console.log(`App listening on http://localhost:${port}`);
});

// /v1/data