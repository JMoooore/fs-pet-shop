const express = require('express');
const app = express();
const fs = require('fs');
const PATH = require('path');
const PORT = 8000;
//Necessary Data
const petsPath = PATH.join(__dirname, 'pets.json');
const petsJSON = fs.readFileSync(petsPath, "utf-8")

//Handle all requests
app.get('/pets/:index', getPet);
app.delete('/pets/:index', deletePet);
app.use(express.json());
app.post('/pets/:index', postPet);
app.patch('/pets/:index', patchPet);

//Error handling
app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err })
});

//Listening on a port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})

//Helper method to delte a pet at an index
function deletePet (req, res, next) {
    let index = req.params.index
    console.log(index)
    let petsData = JSON.parse(petsJSON)
    if (index < 0 || index > petsData.length-1) {
        next({ status: 404, message: 'Please enter a number in range' }); 
    } else {
        let deletedPet = petsData.splice(index, 1)
        fs.writeFileSync(petsPath, JSON.stringify(petsData))
        res.end(JSON.stringify(deletedPet))
    }
}

//Helper method to update a pets data
function patchPet (req, res, next) {
    let index = req.params.index
    let petsData = JSON.parse(petsJSON)
    if (req.body.name || req.body.age || req.body.kind) {
        if (index < 0 || index > petsData.length) {
            next({ status: 404, message: 'Please enter a number in range' }); 
        } else {
            //Can we do dynamically with for in loop?
            let updatedPet = petsData[index]
            if (req.body.name) {
                updatedPet.name = req.body.name
            }
            if (req.body.age) {
                updatedPet.age = req.body.age
            }
            if (req.body.kind) {
                updatedPet.kind = req.body.kind
            }
            fs.writeFileSync(petsPath, JSON.stringify(petsData));
            res.end(JSON.stringify(petsData[index]));
        }
    } else {
        next({ status: 404, message: 'age: "" or kind: "" or name: "" or some combination of the 3'})
    }
}

//Helper method to add a new pet at a specific index
function postPet (req, res, next) {
    let index = req.params.index
    let petsData = JSON.parse(petsJSON)
    if (req.body.name && req.body.age && req.body.kind) {
        if (index < 0 || index > petsData.length) {
            next({ status: 404, message: 'Please enter a number in range' }); 
        } else {
            let newPet = {"age": req.body.age, "kind": req.body.kind, "name": req.body.name}
            petsData.splice(index, 0, newPet)
            fs.writeFileSync(petsPath, JSON.stringify(petsData));
            res.end(JSON.stringify(petsData[index]));
        }
    } else {
        next({ status: 404, message: 'age: "", kind "", name ""'})
    }
}

//Helper method to get a pet at a specific index
function getPet (req, res, next) {
    let index = req.params.index
    let petsData = JSON.parse(petsJSON)
    if (index < 0 || index >= petsData.length) {
        next({ status: 404, message: 'Please enter a number in range' });
    } else {
        let currentPet = petsData[index];
        let petData = JSON.stringify(currentPet);
        res.end(petData);
    }
}