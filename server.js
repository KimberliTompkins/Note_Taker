const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

// Routes
// ===========================================================

// * The following HTML routes should be created:
// 
//   * GET `/notes` - Should return the `notes.html` file.
      app.get("/notes",(req,res)=>{
        fs.readFile(path.join(__dirname, "./public/notes.html"), function(err,data){
            if(err) throw err;
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data)  ;
          });
      })
      
// * The following API routes should be created:
// 
//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
       app.get("/api/notes",(req,res)=>{

        fs.readFile(path.join(__dirname,"./db/db.json"),"utf-8",function(err,data){
            if(err) throw err;
            return res.json(JSON.parse(data)) ;
        })

    })

    //   * GET `*` - Should return the `index.html` file
    app.get("*",(req,res)=>{
        fs.readFile(path.join(__dirname, "./public/index.html"), function(err,data){
                       if(err) throw err;
                       res.writeHead(200, {"Content-Type": "text/html"});
                       res.end(data)  ;

          })
      })
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return 
                        // the new note to the client.
                
        app.post("/api/notes",(req,res)=>{

            fs.readFile(path.join(__dirname,"./db/db.json"),"utf-8",function(err,data){
                if(err) throw err;
                const notesJSON = JSON.parse(data);
                notesJSON.push(req.body);
                
                fs.writeFile(path.join(__dirname,"./db/db.json"), JSON.stringify(notesJSON), (err) => {
                    if(err){
                        throw err;
                    }
                    console.log(notesJSON)
                })
            })

            
       
       
       
        })
//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to 
                            //  find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need 
                            //  to read all notes from the `db.json` file, remove the note with the given `id` property, and then 
                            //  rewrite the notes to the `db.json` file.
app.listen(PORT,()=>{
    console.log("App listening on PORT " + PORT);
})