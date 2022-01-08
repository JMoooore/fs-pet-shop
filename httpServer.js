const fs = require("fs");
const PATH = require("path");
const http = require("http");
const port = 8000;

let server = http.createServer((req,res) => {
    const regex = /[/pets/\d]/g;
    const matchArr = req.url.match(regex);
    if (req.method === 'GET' && matchArr.length>=5) {     
        let petsPath = PATH.join(__dirname, 'pets.json');
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
              console.error(err.stack);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              return res.end('Internal Server Error');
            }
            let petsData = JSON.parse(petsJSON)
            console.log(matchArr[6])
            if (matchArr.length>5 && matchArr[6]>=0 && matchArr[6]<petsData.length) {
                let singlePet = petsData[matchArr[6]]
                singlePet = JSON.stringify(singlePet)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(singlePet);
            } else if (matchArr.length === 5) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(petsJSON);
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end("Not found");
            }
        });
    }
    // } else if(req.method === 'GET' && req.url.substring(0,5) === "/pets") {
    //     console.log(req);
    //     let index = req.url.substring(6,req.url.length);
    //     let petsPath = PATH.join(__dirname, 'pets.json');
    //     fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    //         if (err) {
    //           console.error(err.stack);
    //           res.statusCode = 500;
    //           res.setHeader('Content-Type', 'text/plain');
    //           return res.end('Internal Server Error');
    //         } 
    //         let petsData = JSON.parse(petsJSON)
    //         if (index < 0 || index>petsData.length-1) {
    //             res.statusCode = 404;
    //             res.setHeader('Content-Type', 'text/plain');
    //             res.end("Not found");
    //         } else {
    //         let singlePet = petsData[index]
    //         singlePet = JSON.stringify(singlePet)
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'application/json');
    //         res.end(singlePet);
    //         }
    //     });
    // } 
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
});

server.listen(port, function() {
    console.log('Listening on port', port);
  });