const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// ===========================================================

// * The following HTML routes should be created:
// 
//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./public/notes.html"), function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
})

// * The following API routes should be created:
// 
//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        if (err) throw err;
        return res.json(JSON.parse(data));
    })

})
app.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "./public/index.html"), function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);

    })
})

//   * GET `*` - Should return the `index.html` file
app.get("*", (req, res) => {
    fs.readFile(path.join(__dirname, "./public/index.html"), function (err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);

    })
})
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return 
// the new note to the client.

app.post("/api/notes", (req, res) => {

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        if (err) throw err;
        //get unique id
        const id = uuid.v4();
        const notesJSON = JSON.parse(data);
        // this is so I can add the unique id to the request
        const modifedReq = req.body;
        modifedReq.id = id;
        notesJSON.push(modifedReq);

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notesJSON), (err) => {
            if (err) {
                throw err;
            }
            // console.log(notesJSON)
        })
    })





})

app.delete("/api/notes/:id", (req, res) => {

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        if (err) throw err;
        const notesJSON = JSON.parse(data);
        // keep only the items that don't match the id then write back to the db.json file.
        const result = notesJSON.filter(arrayItem => arrayItem.id !== req.params.id);
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify
            (result), (err) => {
                if (err) {
                    throw err;
                }
            })
    });


})
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);

})