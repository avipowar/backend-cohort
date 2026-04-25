import fs from "node:fs";

// WRITE

// fs.writeFile("async-txt", "hey i am avi", (err)=> {
//     if(err) console.log(err)

//     console.log("file written successfully")
// })

// READ 

// fs.readFile("async-txt", "UTF-8", (err, data)=> {
//     if(err) console.log(err)

//     console.log("READ: ", data)
// })

fs.readFile("async.txt", "utf-8", (err, data)=> {
    if(err) console.log(err)
    
    fs.writeFile("a.txt", data, (err)=>{

        fs.appendFile("a.txt", "\nDone", (err)=> {

            fs.unlink("async.txt", (err)=> {
                console.log("async.txt deleted")
            })
        })
    } )
})