const fs = require("fs");
const path = require("path");

const save = async (bookData)=>{
    try {
        await fs.writeFile(path.join(__dirname, "..", "data", "books.json"), JSON.stringify(bookData, null, " "), ()=>{
            return true
        })
        // return true
    } catch (error) {
        return false
    }
}

module.exports = save;