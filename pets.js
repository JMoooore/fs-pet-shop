#!/usr/bin/env node

const fs = require("fs");
const {exit, argv} = require("process");

if (argv[2] === "read") {
    fs.readFile("./pets.json", "utf-8", (err, fileData) => {
        if (err) {
            console.error("Usage: node pets.js [read | create | update | destroy]");
            exit(1);
        }
        let jsonFormatData = JSON.parse(fileData)
        if (argv[3]) {
            if (argv[3]<jsonFormatData.length && argv[3] >= 0) {
                console.log(jsonFormatData[argv[3]]);
            } else {
                console.error("Usage: node pets.js read INDEX");
                exit(1);
            }
        } else {
            console.log(jsonFormatData); 
        }
    });
} else if (argv[2] === "create") {
        if (argv[3] && argv[4] && argv[5]) {
            let fileData = fs.readFileSync("./pets.json")
            let jsonFormatData = JSON.parse(fileData);
            let data = {age: parseInt(argv[3]), kind: argv[4], name: argv[5]};
            jsonFormatData.push(data)
            fs.writeFileSync("./pets.json",JSON.stringify(jsonFormatData));
        } else {
            console.error("Usage: node pets.js create AGE KIND NAME");
            exit(1);
        }
} else if (argv[2] === "update") {
    if (argv[3] && argv[4] && argv[5] && argv[6]) {
        let fileData = fs.readFileSync("./pets.json")
        let jsonFormatData = JSON.parse(fileData);
        let data = {age: parseInt(argv[4]), kind: argv[5], name: argv[6]};
        jsonFormatData[argv[3]] = data;
        fs.writeFileSync("./pets.json",JSON.stringify(jsonFormatData));
    } else {
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
        exit(1);
    } 
} else if (argv[2] === "destroy") {
    if (argv[3]) {
        let fileData = fs.readFileSync("./pets.json")
        let jsonFormatData = JSON.parse(fileData);
        let deletedElement = jsonFormatData.splice(argv[3],1);
        console.log(deletedElement);
        fs.writeFileSync("./pets.json",JSON.stringify(jsonFormatData));
    } else {
        console.error("Usage: node pets.js destroy INDEX");
        exit(1);
    } 
} else {
    console.error("Usage: node pets.js [read | create | update | destroy]");
    exit(1);
}
