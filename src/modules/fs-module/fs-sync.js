import fs from "node:fs"

// write 

// fs.writeFileSync("sync.txt", "hii dude")


// read 

// const data = fs.readFileSync("sync.text", "utf-8")
// console.log(data)

// not override the text

// fs.appendFileSync("sync.txt", 'hey ashish')



// create folder
//  add recursive because if parent is not created he will created adn add child
// fs.mkdirSync("Avinash/ashish",{recursive: true})

// rename file 
// fs.renameSync("sync.txt", "01-synx-txt")

// delete folder
// fs.unlinkSync("sync.txt")

// copy the file 
// fs.cpSync("sync.txt", "finalText.txt")

// delete the folder 
// if folder is empty then it will work
fs.rmdirSync("Avinash")