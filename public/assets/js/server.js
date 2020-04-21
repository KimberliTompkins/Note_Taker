var express = require("express");
const fs = require("fs")

var app = express();
var PORT = 3000;

// Routes
// ===========================================================

// * The following HTML routes should be created:
// 
//   * GET `/notes` - Should return the `notes.html` file.
      app.get("/notes",function(req,res){
        fs.readFile("../../notes.html", function(err,data){
            if(err) throw err;
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data)  ;
          });
      })
      
    
//   * GET `*` - Should return the `index.html` file
      app.get("/",function(req,res){
          fs.readFile("../../index.html",function(err,data){
                       if(err) throw err;
                       res.writeHead(200, {"Content-Type": "text/html"});
                       res.end(data)  ;

          })
      })
// * The following API routes should be created:
// 
//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
       app.get("/api/notes", function(req,res){

        fs.readFile("../../../db/db.json",function(err,data){
            if(err) throw err;
            return res.json(data)  ;
        })

    })
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return 
                        // the new note to the client.
// 
//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to 
                            //  find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need 
                            //  to read all notes from the `db.json` file, remove the note with the given `id` property, and then 
                            //  rewrite the notes to the `db.json` file.
app.listen(PORT,function(){
    console.log("App listening on PORT " + PORT);
})