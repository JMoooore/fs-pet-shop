const express = require("express")
const app = express();
const fs = require("fs");
const port = 5555;

app.get("/animals", (req,res) => {
    const animalsJSON = fs.readFileSync("./animals.txt", "utf-8");
    res.send(animalsJSON)
})

app.listen(port, () => {
    console.log(`You are listening on port: ${port}`);
})

