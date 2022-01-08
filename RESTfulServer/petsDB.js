const express = require('express');
const app = express();
const {Pool} = require('pg');
const PORT = 8000;

const pool = new Pool({
    user: 'HankMoore',
    host: 'localHost',
    port: 5432,
    database: 'petshop',
    password: ''
})

//Route handling
app.use(express.json());
app.get('/pets', getAllPets)
app.get('/pets/:id', getOnePet);
app.post('/pets', addAPet);
app.patch('/pets/:id', updateAPet)
app.delete('/pets/:id', deleteAPet)

app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err })
});

//Listening for port
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`))

async function addAPet(req,res,next) {
    try {
        await pool.query(`INSERT INTO pets(age, kind, name) VALUES (${req.body.age}, '${req.body.kind}', '${req.body.name}')`)
        res.send('updated');
    } catch (err) {
        res.status(500);
        res.json(err);
    }
}

async function getOnePet(req,res,next) {
    try {
        const id = req.params.id
        const dbData = await pool.query(`SELECT * FROM pets WHERE petID = ${id}`);
        const row = dbData.rows[0]
        res.send(row)
    } catch (err) {
        res.status(500);
        res.json(err);
    }
}

async function getAllPets(req,res,next) {
    try {
        const dbData = await pool.query('SELECT * FROM pets');
        const allRows = dbData.rows;
        res.send(allRows);
    } catch (err) {
        res.status(500);
        res.json(err);
    }
}

async function updateAPet(req,res,next) {
    try {
        //Finds what pet is currently at and creates variables to compare to
        const id = req.params.id
        const dbData = await pool.query(`SELECT * FROM pets WHERE petID = ${id}`)
        const singlePet = dbData.rows[0];
        let {name, age, kind} = singlePet;
        //Checks what the user wants to update and updates singlePet
        if (req.body.name) {
            name = req.body.name
        }
        if (req.body.age)  {
            age = req.body.age 
        }
        if (req.body.kind) {
            kind = req.body.kind
        }
        await pool.query(`UPDATE pets SET name = '${name}', age = ${age}, kind = '${kind}' WHERE petID = ${id}`);
        res.send('updated');
    } catch (error) {
        res.status(500);
        res.json(err);
    }
}

async function deleteAPet(req,res,next) {
    try {
        //Deletes a specific pet
        const id = req.params.id;
        await pool.query(`DELETE FROM pets WHERE petID = ${id}`)
        res.send('It was deleted or it wasnt there to begin with!');
    } catch (err) {
        next({ status: 500, message: 'DataBase Error Sorry!' });
    }
}