import fs from "node:fs/promises"

//  write
// await fs.writeFile("promise.txt", "hey i am promises")

//  read 
const data = await fs.readFile("promise.txt", "utf-8")
console.log(data)

await fs.appendFile("promise.txt", " World");

await fs.unlink("promise.txt");

await fs.mkdir("Avinash");

// Go inside the folder and delete everything inside it
await fs.rm("Avinash", { recursive: true, force: true });