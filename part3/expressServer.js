//Dependencies
//const http = require("http");
const express = require("express")
const app = express();
const fs = require("fs");
const PATH = require("path");
const port = 5555;
//Necessary data
const petsPath = PATH.join(__dirname, 'pets.json');
const petsJSON = fs.readFileSync(petsPath, "utf-8")

//Handle different get statments
app.get("/pets", logPetsData)
app.get("/pets/:num", logPetsData)
app.post("/pets", express.json(), addPetsData)
app.post("/pets/:num", express.json(), addPetsData)

//Handle any errors
app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err })
});

//Listen
app.listen(port, () => {
    console.log(`You are listening on port: ${port}`);
})


//Handle data
function logPetsData (req, res, next) {
    let num;
    let petsData = JSON.parse(petsJSON)
    console.log(req.params.num);
    if (req.params.num) {
        num = req.params.num;
        if (num < 0 || num > petsData.length-1) {
            next({ status: 404, message: 'Please enter a number in range' })
        }
        let singlePet = petsData[num];
        res.send(JSON.stringify(singlePet));
    } else {
        res.send(petsJSON)
    }
}

function addPetsData(req, res, next) {
    let newPet;
    let petsData = JSON.parse(petsJSON)
    let num;
    if (req.body.name && req.body.age && req.body.kind) {
        newPet = {"age": req.body.age, "kind": req.body.kind, "name": req.body.name}
        if (req.params.num) {
            num = req.params.num
            if (num < 0 || num > petsData.length) {
                console.log("in here")
                next({ status: 404, message: 'Please enter a number in range' });
            } else {
            petsData.splice(num,0,newPet)
            res.send(JSON.stringify(newPet))
            }
        } else {
            petsData.push(newPet)
            res.send(JSON.stringify(newPet))
        }
        fs.writeFileSync("./pets.json",JSON.stringify(petsData));
    } else {
        next({ status: 404, message: 'age: "", kind "", name ""' });
    }
}