const path = require("path")
const {compressFile} = require("./compressFile");

const linksFilePath = path.resolve(__dirname ,'../db', 'links.dev.json')
const dbPath = path.resolve(__dirname, '../db')
console.log(dbPath)

function dumpDatabase(){
    // npmjs.com/package/cron
    setInterval(() =>{
        compressFile(linksFilePath, path.resolve(dbPath, "dumps"), "db-dump.json")
        console.log('Database dump was created')
    }, 10000)
}

module.exports ={
    dumpDatabase
}